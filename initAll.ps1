$backend = Join-Path $PSScriptRoot "backend"
$frontend = Join-Path $PSScriptRoot "carga-expedientes"

$backendJob = $null
$frontendJob = $null

try {
    # Backend
    if (Test-Path $backend) {
        Write-Host "Actualizando dependencias del backend..."
        Push-Location $backend
        bun install --no-cache
        Write-Host "Iniciando servidor backend en segundo plano..."
        $backendJob = Start-Job -ScriptBlock {
            Push-Location $using:backend
            bun run start
        }
        Pop-Location
    } else {
        Write-Host "El directorio backend no existe. Omitiendo inicialización."
    }

    # Frontend
    if (Test-Path $frontend) {
        Write-Host "Actualizando dependencias del frontend..."
        Push-Location $frontend
        bun install --no-cache
        Write-Host "Iniciando servidor frontend en segundo plano..."
        $frontendJob = Start-Job -ScriptBlock {
            Push-Location $using:frontend
            bun run dev
        }
        Pop-Location
    } else {
        Write-Host "El directorio frontend no existe. Omitiendo inicialización."
    }

    Write-Host "Servidores ejecutándose. Presiona Ctrl+C para detenerlos..."
    while ($true) {
        Start-Sleep -Seconds 1
    }
}
finally {
    Write-Host "`nDeteniendo servidores..."
    if ($backendJob) { Stop-Job $backendJob | Out-Null; Remove-Job $backendJob | Out-Null }
    if ($frontendJob) { Stop-Job $frontendJob | Out-Null; Remove-Job $frontendJob | Out-Null }
    Write-Host "Servidores detenidos."
}