package middleware

import (
	"net/http"

	"github.com/MarcoRehmer/hamsta-cms/pkg/requestid"
)

func RequestID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := r.Header.Get(requestid.HeaderName)
		if id == "" {
			id = requestid.Generate()
		}

		ctx := requestid.WithContext(r.Context(), id)
		w.Header().Set(requestid.HeaderName, id)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
