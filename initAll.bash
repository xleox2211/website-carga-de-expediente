#!/usr/bin/env bash

backend="$(dirname "$0")/backend"
frontend="$(dirname "$0")/carga-expedientes"

backend_pid=""
frontend_pid=""

# Function to stop background processes
cleanup() {
    echo -e "\nDeteniendo servidores..."
    if [[ -n "$backend_pid" ]]; then
        kill "$backend_pid" 2>/dev/null
        wait "$backend_pid" 2>/dev/null
    fi
    if [[ -n "$frontend_pid" ]]; then
        kill "$frontend_pid" 2>/dev/null
        wait "$frontend_pid" 2>/dev/null
    fi
    echo "Servidores detenidos."
}
trap cleanup EXIT

# Backend
if [[ -d "$backend" ]]; then
    echo "Actualizando dependencias del backend..."
    pushd "$backend" > /dev/null
    bun install --no-cache
    echo "Iniciando servidor backend en segundo plano..."
    bun run start &
    backend_pid=$!
    popd > /dev/null
else
    echo "El directorio backend no existe. Omitiendo inicialización."
fi

# Frontend
if [[ -d "$frontend" ]]; then
    echo "Actualizando dependencias del frontend..."
    pushd "$frontend" > /dev/null
    bun install --no-cache
    echo "Iniciando servidor frontend en segundo plano..."
    bun run dev &
    frontend_pid=$!
    popd > /dev/null
else
    echo "El directorio frontend no existe. Omitiendo inicialización."
fi

echo "Servidores ejecutándose. Presiona Ctrl+C para detenerlos..."
while true; do
    sleep 1
done