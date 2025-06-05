#!/bin/bash

# ───────────────────────────────────────────────────────────────
# 🧪 Validación de entorno y arranque interactivo de Expo
# Diseñado para usarse dentro del contenedor Docker de desarrollo
# Montado en /scripts, ejecuta todo desde /app
# ───────────────────────────────────────────────────────────────

APP_DIR="/app"

GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
NC="\033[0m"

echo -e "${YELLOW}🔍 Cambiando directorio a ${APP_DIR}...${NC}"
cd "$APP_DIR" || {
  echo -e "${RED}❌ No se pudo acceder al directorio $APP_DIR${NC}"
  exit 1
}

echo -e "${YELLOW}🔍 Verificando entorno...${NC}"

if [ ! -f package.json ]; then
  echo -e "${RED}❌ No se encontró package.json en $APP_DIR. ¿El volumen está montado correctamente?${NC}"
  exit 1
fi

echo -e "${GREEN}✅ package.json encontrado.${NC}"

echo -e "${YELLOW}📦 Verificando dependencias...${NC}"

if [ ! -d node_modules ]; then
  echo -e "${YELLOW}🔧 Instalando dependencias (npm install)...${NC}"
  npm install
else
  echo -e "${GREEN}✅ Dependencias instaladas.${NC}"
fi

# Verificar si Metro Bundler (Expo) ya está corriendo
EXPO_PID=$(pgrep -f "node.*expo")

if [ -n "$EXPO_PID" ]; then
  echo -e "${YELLOW}🛑 Expo ya está en ejecución (PID: $EXPO_PID), deteniéndolo...${NC}"
  kill "$EXPO_PID"
  sleep 2
else
  echo -e "${GREEN}✅ No hay instancias previas de Expo corriendo.${NC}"
fi

# Validar versiones recomendadas por Expo
echo -e "${YELLOW}🔍 Verificando compatibilidad de versiones recomendadas por Expo...${NC}"

MISMATCH=$(npx expo doctor | grep -E "expected version" | wc -l)

if [ "$MISMATCH" -gt 0 ]; then
  echo -e "${RED}⚠️ Se detectaron paquetes con versiones no compatibles con el SDK actual.${NC}"
  echo -e "${YELLOW}Mostrando detalles:\n${NC}"
  npx expo doctor | grep -E "expected version"

  echo -e "\n${YELLOW}¿Deseas instalar automáticamente las versiones compatibles? (s/n): ${NC}"
  read -r RESP

  if [[ "$RESP" == "s" || "$RESP" == "S" ]]; then
    echo -e "${YELLOW}🔧 Corrigiendo versiones...${NC}"
    npx expo install
  else
    echo -e "${YELLOW}⏭️ Continuando sin corregir versiones...${NC}"
  fi
else
  echo -e "${GREEN}✅ Todas las versiones están alineadas con el SDK de Expo.${NC}"
fi

# Limpiar pantalla e iniciar Expo con caché limpio
clear
echo -e "${GREEN}🚀 Iniciando Expo con caché limpio (--clear)...${NC}"
echo -e "${YELLOW}🖐 Puedes usar las teclas: a / w / r / m / ? en esta terminal.${NC}"

npx expo start --lan --clear
