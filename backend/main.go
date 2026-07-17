package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"
)

type Entry struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
}

type EntryRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

type ErrorResponse struct {
	Message string `json:"message"`
}

var (
	entries []Entry
	mu      sync.Mutex
	nextID  = 1
)

func cors(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5175")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next(w, r)
	}
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}

func handleEntries(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		createEntry(w, r)
	case http.MethodGet:
		listEntries(w, r)
	default:
		writeJSON(w, http.StatusMethodNotAllowed, ErrorResponse{"Method not allowed"})
	}
}

func createEntry(w http.ResponseWriter, r *http.Request) {
	var req EntryRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, ErrorResponse{"Invalid JSON"})
		return
	}

	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.TrimSpace(req.Email)

	if req.Name == "" {
		writeJSON(w, http.StatusBadRequest, ErrorResponse{"名前は必須です"})
		return
	}
	if req.Email == "" || !strings.Contains(req.Email, "@") {
		writeJSON(w, http.StatusBadRequest, ErrorResponse{"正しいメールアドレスを入力してください"})
		return
	}

	mu.Lock()
	entry := Entry{
		ID:        nextID,
		Name:      req.Name,
		Email:     req.Email,
		CreatedAt: time.Now(),
	}
	entries = append(entries, entry)
	nextID++
	mu.Unlock()

	log.Printf("[応募受付] ID:%d  %s <%s>", entry.ID, entry.Name, entry.Email)
	writeJSON(w, http.StatusCreated, entry)
}

func listEntries(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()
	if entries == nil {
		writeJSON(w, http.StatusOK, []Entry{})
		return
	}
	writeJSON(w, http.StatusOK, entries)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/entries", cors(handleEntries))

	addr := ":8080"
	log.Printf("サーバー起動: http://localhost%s", addr)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatal(err)
	}
}
