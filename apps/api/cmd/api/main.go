package main

import (
	"context"
	"log"
	"os"

	"github.com/MarcoRehmer/hamsta-cms/internal/app"
)

func main() {
	if err := app.Run(context.Background()); err != nil {
		log.Printf("api service stopped with error: %v", err)
		os.Exit(1)
	}
}
