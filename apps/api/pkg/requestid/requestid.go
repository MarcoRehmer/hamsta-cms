package requestid

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"fmt"

	"github.com/google/uuid"
)

type contextKey string

const (
	HeaderName = "X-Request-Id"
	ctxKey     = contextKey("request-id")
)

func Generate() string {
	id, err := uuid.NewRandom()
	if err == nil {
		return id.String()
	}

	bytes := make([]byte, 16)
	if _, fallbackErr := rand.Read(bytes); fallbackErr == nil {
		return hex.EncodeToString(bytes)
	}

	return fmt.Sprintf("fallback-%d", uuid.ClockSequence())
}

func WithContext(ctx context.Context, id string) context.Context {
	return context.WithValue(ctx, ctxKey, id)
}

func FromContext(ctx context.Context) (string, bool) {
	id, ok := ctx.Value(ctxKey).(string)
	if !ok || id == "" {
		return "", false
	}

	return id, true
}
