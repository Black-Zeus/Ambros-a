#!/bin/bash

# ───────────────────────────────────────────────────────────────
# 🏗️ Script EAS Build estable con selección de perfiles
# ───────────────────────────────────────────────────────────────

APP_DIR="/app"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
BLUE="\033[0;34m"
NC="\033[0m"

clear

echo -e "${BLUE}🏗️ EAS Build - Compilador de Apps${NC}"
echo -e "${BLUE}═══════════════════════════════════${NC}"

cd "$APP_DIR" || {
  echo -e "${RED}❌ No se pudo acceder al directorio $APP_DIR${NC}"
  exit 1
}

# Validar token
if [ -z "$EXPO_TOKEN" ]; then
  echo -e "${RED}❌ EXPO_TOKEN no está definido en las variables de entorno${NC}"
  exit 1
fi

# Instalar EAS CLI si no existe
if ! command -v eas &> /dev/null; then
  echo -e "${YELLOW}🔧 Instalando EAS CLI...${NC}"
  npm install -g eas-cli > /dev/null 2>&1
fi

# Verificar si el proyecto EAS está inicializado
echo -e "${YELLOW}🔍 Verificando configuración del proyecto...${NC}"
if ! eas project:info > /dev/null 2>&1; then
  echo -e "${YELLOW}⚠️ El proyecto EAS no está inicializado. Ejecutando 'eas init'...${NC}"
  if ! eas init; then
    echo -e "${RED}❌ Error al inicializar el proyecto EAS${NC}"
    exit 1
  fi
  echo -e "${GREEN}✅ Proyecto EAS inicializado correctamente${NC}"
fi

# Selección de perfil
echo -e "\n${YELLOW}📋 Perfiles de build disponibles:${NC}"
echo -e "${GREEN}1)${NC} development  ${BLUE}(APK para desarrollo y testing)${NC}"
echo -e "${GREEN}2)${NC} preview      ${BLUE}(APK para demos y distribución interna)${NC}"
echo -e "${GREEN}3)${NC} production   ${BLUE}(AAB para Google Play Store)${NC}"
echo ""
echo -ne "${YELLOW}Selecciona un perfil [1-3]: ${NC}"
read -r PERFIL_OPCION

PERFIL=""
DESCRIPCION=""
case $PERFIL_OPCION in
  1) 
    PERFIL="development"
    DESCRIPCION="Development APK"
    ;;
  2) 
    PERFIL="preview"
    DESCRIPCION="Preview APK"
    ;;
  3) 
    PERFIL="production"
    DESCRIPCION="Production AAB"
    ;;
  *) 
    echo -e "${RED}❌ Opción inválida. Usa 1, 2 o 3${NC}"
    exit 1
    ;;
esac

# Confirmación
echo ""
echo -e "${BLUE}🚀 Configuración seleccionada:${NC}"
echo -e "   Perfil: ${GREEN}${PERFIL}${NC}"
echo -e "   Tipo: ${GREEN}${DESCRIPCION}${NC}"
echo -e "   Plataforma: ${GREEN}Android${NC}"
echo ""
echo -ne "${YELLOW}¿Continuar con el build? [y/N]: ${NC}"
read -r CONFIRMAR

if [[ ! "$CONFIRMAR" =~ ^[Yy]$ ]]; then
  echo -e "${YELLOW}⏹️ Build cancelado${NC}"
  exit 0
fi

# Ejecutar build
echo ""
echo -e "${YELLOW}🔨 Iniciando build...${NC}"
echo -e "${BLUE}═══════════════════════${NC}"

if eas build --platform android --profile "$PERFIL" --non-interactive; then
  echo ""
  echo -e "${GREEN}✅ Build completado exitosamente!${NC}"
  echo -e "${BLUE}📱 Tu ${DESCRIPCION} estará disponible en:${NC}"
  echo -e "   ${YELLOW}https://expo.dev/accounts/blackzeus/projects/Ambrosia/builds${NC}"
else
  echo ""
  echo -e "${RED}❌ El build falló. Revisa los errores anteriores.${NC}"
  exit 1
fi