package server

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"time"

	"github.com/MarcoRehmer/hamsta-cms/internal/config"
	"github.com/MarcoRehmer/hamsta-cms/internal/server/handlers"
	"github.com/MarcoRehmer/hamsta-cms/internal/server/middleware"
	"github.com/MarcoRehmer/hamsta-cms/pkg/requestid"
)

type Server struct {
	httpServer *http.Server
	logger     *slog.Logger
}

func New(cfg config.Config, logger *slog.Logger) *Server {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", handlers.Health(cfg.ServiceName))
	mux.HandleFunc("GET /readiness", handlers.Ready(cfg.ServiceName))

	handler := middleware.RequestID(logRequests(logger, mux))

	return &Server{
		httpServer: &http.Server{
			Addr:         cfg.Address(),
			Handler:      handler,
			ReadTimeout:  cfg.ReadTimeout,
			WriteTimeout: cfg.WriteTimeout,
		},
		logger: logger,
	}
}

func (s *Server) Start() error {
	s.logger.Info("starting HTTP server", "address", s.httpServer.Addr)
	err := s.httpServer.ListenAndServe()
	if err != nil && !errors.Is(err, http.ErrServerClosed) {
		return err
	}

	return nil
}

func (s *Server) Shutdown(ctx context.Context) error {
	s.logger.Info("shutting down HTTP server")
	return s.httpServer.Shutdown(ctx)
}

func logRequests(logger *slog.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)

		id, ok := requestid.FromContext(r.Context())
		if !ok {
			id = "unknown"
		}

		logger.Info("request handled",
			"method", r.Method,
			"path", r.URL.Path,
			"remote_addr", r.RemoteAddr,
			"duration_ms", time.Since(start).Milliseconds(),
			"request_id", id,
		)
	})
}
