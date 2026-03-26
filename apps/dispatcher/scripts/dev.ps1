$goBin = $env:GO_BIN
if (-not $goBin) {
  $goBin = (Get-Command go -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source -ErrorAction SilentlyContinue)
}

if (-not $goBin) {
  Write-Host "Go toolchain not found. Set GO_BIN or add go.exe to PATH."
  exit 0
}

& $goBin run ./cmd/dispatcher
