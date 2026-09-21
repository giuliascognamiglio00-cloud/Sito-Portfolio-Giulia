# Avvia il sito in locale.
# Se una copia sta già girando sulla stessa porta la chiude prima, così il task si può
# rilanciare quante volte si vuole senza dover chiudere niente a mano.

$ErrorActionPreference = 'Stop'

$port = 3000
$siteDir = Join-Path $PSScriptRoot '..\site'

# Node può essere stato installato dopo l'avvio dell'editor, e quindi non essere ancora
# nel PATH di questa sessione: in quel caso lo cerchiamo dove winget lo installa.
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    $nodeDir = Join-Path $env:ProgramFiles 'nodejs'
    if (Test-Path (Join-Path $nodeDir 'node.exe')) {
        $env:PATH = "$nodeDir;$env:PATH"
    }
    else {
        Write-Host "Node.js non trovato. Installalo da https://nodejs.org e riprova." -ForegroundColor Red
        exit 1
    }
}

# Chi occupa la porta va chiuso: fermare il terminale che aveva lanciato `npm run dev`
# non basta, perché il processo node figlio resta in ascolto per conto suo.
$occupanti = @()
try {
    $occupanti = @(
        Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue |
        Select-Object -ExpandProperty OwningProcess -Unique
    )
}
catch {
    # Get-NetTCPConnection non disponibile: si prosegue, al massimo npm segnalerà la porta occupata.
}

foreach ($processId in $occupanti) {
    try {
        $processo = Get-Process -Id $processId -ErrorAction Stop
        Write-Host "Chiudo il sito già in esecuzione (PID $processId, $($processo.ProcessName))..." -ForegroundColor Yellow
        Stop-Process -Id $processId -Force -ErrorAction Stop
    }
    catch {
        Write-Host "Non sono riuscito a chiudere il processo $processId : $($_.Exception.Message)" -ForegroundColor Red
    }
}

if ($occupanti.Count -gt 0) {
    # Un attimo perché Windows rilasci davvero la porta, altrimenti npm ne sceglierebbe un'altra.
    Start-Sleep -Milliseconds 800
}

Write-Host "Avvio il sito su http://localhost:$port" -ForegroundColor Green

Set-Location $siteDir
npm run dev
