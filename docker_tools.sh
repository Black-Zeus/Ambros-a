#!/bin/bash

# Variables iniciales
ENV="dev"
LABEL_FILTER="stack=Ambrosia"
COMPOSE_FILE=""
CURRENT_IP=""

# Función para obtener la IP actual del equipo
get_current_ip() {
    # Intentar obtener IP por diferentes métodos
    local ip=""
    
    # Método 1: Usar ip route (Linux)
    if command -v ip &> /dev/null; then
        ip=$(ip route get 8.8.8.8 2>/dev/null | awk '{print $7; exit}')
    fi
    
    # Método 2: Usar route (macOS/Linux)
    if [[ -z "$ip" ]] && command -v route &> /dev/null; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            ip=$(route get default 2>/dev/null | grep 'interface:' | awk '{print $2}' | xargs ifconfig 2>/dev/null | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $2}' | head -1)
        else
            # Linux
            ip=$(route -n get default 2>/dev/null | grep 'interface:' | awk '{print $2}' | xargs ip addr show 2>/dev/null | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $2}' | cut -d'/' -f1 | head -1)
        fi
    fi
    
    # Método 3: Usar hostname (macOS/Linux)
    if [[ -z "$ip" ]] && command -v hostname &> /dev/null; then
        ip=$(hostname -I 2>/dev/null | awk '{print $1}')
    fi
    
    # Método 4: Usar ifconfig (macOS/Linux)
    if [[ -z "$ip" ]] && command -v ifconfig &> /dev/null; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            ip=$(ifconfig | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $2}' | head -1)
        else
            # Linux
            ip=$(ifconfig | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $2}' | head -1)
        fi
    fi
    
    # Método 5: Usar netstat (como último recurso)
    if [[ -z "$ip" ]] && command -v netstat &> /dev/null; then
        ip=$(netstat -rn | grep '^0.0.0.0' | awk '{print $2}' | head -1)
    fi
    
    echo "$ip"
}

# Función para actualizar la IP en el archivo docker-compose
update_ip_in_compose() {
    local new_ip="$1"
    local compose_file="$2"
    
    if [[ -z "$new_ip" ]]; then
        echo "❌ No se pudo obtener la IP actual del equipo."
        return 1
    fi
    
    if [[ ! -f "$compose_file" ]]; then
        echo "❌ El archivo $compose_file no existe."
        return 1
    fi
    
    # Crear backup del archivo original
    cp "$compose_file" "${compose_file}.backup.$(date +%Y%m%d_%H%M%S)"
    
    # Actualizar la IP en el archivo
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/REACT_NATIVE_PACKAGER_HOSTNAME=.*/REACT_NATIVE_PACKAGER_HOSTNAME=$new_ip/" "$compose_file"
    else
        # Linux
        sed -i "s/REACT_NATIVE_PACKAGER_HOSTNAME=.*/REACT_NATIVE_PACKAGER_HOSTNAME=$new_ip/" "$compose_file"
    fi
    
    echo "✅ IP actualizada a $new_ip en $compose_file"
    return 0
}

# Funcion para truncar texto y mantener tamaño maximo
truncate_text() {
    local text="$1"
    local length="$2"
    if [[ ${#text} -gt $length ]]; then
        echo "${text:0:$(($length-3))}..."
    else
        printf "%-${length}s" "$text"
    fi
}

# Define el archivo de configuración de Docker Compose según el entorno
define_compose_file() {
  case "$ENV" in
    "dev")
      COMPOSE_FILE="docker-compose-dev.yml"
      ;;
    "qa")
      COMPOSE_FILE="docker-compose-qa.yml"
      ;;
    "prd")
      COMPOSE_FILE="docker-compose.yml"
      ;;
    *)
      echo "Entorno no válido. Se usará el archivo por defecto: docker-compose-dev.yml"
      COMPOSE_FILE="docker-compose-dev.yml"
      ;;
  esac
}

# Menú principal
menu() {
  clear
  define_compose_file
  check_current_ip
  echo "======================================="
  echo "Docker Tools - Entorno: $ENV"
  echo "Archivo de configuración: $COMPOSE_FILE"
  echo "======================================="
  echo ""
  echo " 1. 📋 MANEJADOR DE CONTENEDORES"
  echo " 2. 📊 MONITOREO Y DIAGNÓSTICO"
  echo " 3. 🧹 LIMPIEZA Y MANTENIMIENTO"
  echo " 4. ⚙️  CONFIGURACIÓN DEL SISTEMA"
  echo " 5. 📱 HERRAMIENTAS EXPO"
  echo ""
  echo " S. 🚪 Salir"
  echo "======================================="
  read -p "👉 Seleccione una opción [1-5, S]: " choice

  case "$choice" in
    1) menu_contenedores ;;
    2) menu_monitoreo ;;
    3) menu_limpieza ;;
    4) menu_configuracion ;;
    5) menu_expo ;;
    [Ss]) exit_script ;;
    *)
      echo "❌ Opción inválida. Inténtelo de nuevo."
      sleep 3
      menu
      ;;
  esac
}

# Submenú: Manejador de Contenedores
menu_contenedores() {
  clear
  echo "======================================="
  echo "📋 MANEJADOR DE CONTENEDORES"
  echo "Entorno: $ENV | Archivo: $COMPOSE_FILE"
  echo "======================================="
  echo ""
  echo " 1. 🚀 Iniciar contenedores y construir imagenes"
  echo " 2. 🛑 Detener y eliminar contenedores"
  echo " 3. 🔄 Reiniciar contenedores"
  echo " 4. 🔃 Reiniciar contenedor unico"
  echo " 5. 🔨 Construir imágenes"
  echo ""
  echo " V. ⬅️  Volver al menú principal"
  echo " S. 🚪 Salir"
  echo "======================================="
  read -p "👉 Seleccione una opción [1-5, V, S]: " choice

  case "$choice" in
    1) up ;;
    2) down ;;
    3) restart ;;
    4) restart_single_container ;;
    5) build ;;
    [Vv]) menu ;;
    [Ss]) exit_script ;;
    *)
      echo "❌ Opción inválida. Inténtelo de nuevo."
      sleep 3
      menu_contenedores
      ;;
  esac
}

# Submenú: Monitoreo y Diagnóstico
menu_monitoreo() {
  clear
  echo "======================================="
  echo "📊 MONITOREO Y DIAGNÓSTICO"
  echo "Entorno: $ENV | Archivo: $COMPOSE_FILE"
  echo "======================================="
  echo ""
  echo " 1. 📋 Ver logs"
  echo " 2. 📊 Estado de los contenedores"
  echo " 3. 📦 Listar contenedores de stack"
  echo " 4. 💻 Abrir terminal en contenedor de stack"
  echo ""
  echo " V. ⬅️  Volver al menú principal"
  echo " S. 🚪 Salir"
  echo "======================================="
  read -p "👉 Seleccione una opción [1-4, V, S]: " choice

  case "$choice" in
    1) logs ;;
    2) ps ;;
    3) list_stack ;;
    4) exec_stack ;;
    [Vv]) menu ;;
    [Ss]) exit_script ;;
    *)
      echo "❌ Opción inválida. Inténtelo de nuevo."
      sleep 3
      menu_monitoreo
      ;;
  esac
}

# Submenú: Limpieza y Mantenimiento
menu_limpieza() {
  clear
  echo "======================================="
  echo "🧹 LIMPIEZA Y MANTENIMIENTO"
  echo "Entorno: $ENV | Archivo: $COMPOSE_FILE"
  echo "======================================="
  echo ""
  echo " 1. 🧹 Limpiar contenedores, redes, imágenes y volúmenes"
  echo " 2. 🖼️  Limpiar imágenes no utilizadas"
  echo " 3. 💾 Limpiar volúmenes no utilizados"
  echo " 4. 🗑️  Limpiar todo (contenedores, imágenes y volúmenes)"
  echo " 5. 🔥 Eliminar Persistencias"
  echo ""
  echo " V. ⬅️  Volver al menú principal"
  echo " S. 🚪 Salir"
  echo "======================================="
  read -p "👉 Seleccione una opción [1-5, V, S]: " choice

  case "$choice" in
    1) clean ;;
    2) clean_images ;;
    3) clean_volumes ;;
    4) clean_all ;;
    5) drop_persistence ;;
    [Vv]) menu ;;
    [Ss]) exit_script ;;
    *)
      echo "❌ Opción inválida. Inténtelo de nuevo."
      sleep 3
      menu_limpieza
      ;;
  esac
}

# Submenú: Configuración del Sistema
menu_configuracion() {
  clear
  echo "======================================="
  echo "⚙️  CONFIGURACIÓN DEL SISTEMA"
  echo "Entorno: $ENV | Archivo: $COMPOSE_FILE"
  echo "======================================="
  echo ""
  echo " 1. 🔧 Cambiar entorno (dev, qa, prd)"
  echo " 2. 🌐 Actualizar IP en Docker Compose"
  echo " 3. 🔍 Verificar IP actual"
  echo ""
  echo " V. ⬅️  Volver al menú principal"
  echo " S. 🚪 Salir"
  echo "======================================="
  read -p "👉 Seleccione una opción [1-3, V, S]: " choice

  case "$choice" in
    1) change_env ;;
    2) update_ip_menu ;;
    3) check_ip_menu ;;
    [Vv]) menu ;;
    [Ss]) exit_script ;;
    *)
      echo "❌ Opción inválida. Inténtelo de nuevo."
      sleep 3
      menu_configuracion
      ;;
  esac
}

# Submenú: Herramientas Expo
menu_expo() {
  clear
  echo "======================================="
  echo "📱 HERRAMIENTAS EXPO"
  echo "Entorno: $ENV | Archivo: $COMPOSE_FILE"
  echo "======================================="
  echo ""
  echo " 1. 🚀 Iniciar Expo (manual desde contenedor)"
  echo " 2. 🔨 Build Expo (próximamente)"
  echo " 3. 📤 Publicar Expo (próximamente)"
  echo " 4. 🔧 Configurar Expo (próximamente)"
  echo ""
  echo " V. ⬅️  Volver al menú principal"
  echo " S. 🚪 Salir"
  echo "======================================="
  read -p "👉 Seleccione una opción [1-4, V, S]: " choice

  case "$choice" in
    1) iniciar_expo ;;
    2) 
      echo "🚧 Función en desarrollo..."
      sleep 3
      menu_expo
      ;;
    3) 
      echo "🚧 Función en desarrollo..."
      sleep 3
      menu_expo
      ;;
    4) 
      echo "🚧 Función en desarrollo..."
      sleep 3
      menu_expo
      ;;
    [Vv]) menu ;;
    [Ss]) exit_script ;;
    *)
      echo "❌ Opción inválida. Inténtelo de nuevo."
      sleep 3
      menu_expo
      ;;
  esac
}

# Funciones 
#### menu_contenedores ######
up() {
  clear
  echo "======================================="
  echo "Docker Tools - Entorno: $ENV"
  echo "Archivo de configuración: $COMPOSE_FILE"
  echo "Iniciando Contenedores"
  echo "======================================="
  echo ""
  docker compose -f "$COMPOSE_FILE" --env-file .env --env-file .env.$ENV up -d --build
  pause
  menu_contenedores
}

down() {
  clear
  echo "======================================="
  echo "Docker Tools - Entorno: $ENV"
  echo "Archivo de configuración: $COMPOSE_FILE"
  echo "Deteniendo y eliminando contenedores"
  echo "======================================="
  echo ""
  docker compose -f "$COMPOSE_FILE" --env-file .env --env-file .env.$ENV down
  pause
  menu_contenedores
}

restart() {
  clear
  echo "======================================="
  echo "Docker Tools - Entorno: $ENV"
  echo "Archivo de configuración: $COMPOSE_FILE"
  echo "Reiniciando contenedores"
  echo "======================================="
  echo ""
  docker compose -f "$COMPOSE_FILE" --env-file .env --env-file .env.$ENV down
  docker compose -f "$COMPOSE_FILE" --env-file .env --env-file .env.$ENV up -d --build
  pause
  menu_contenedores
}

restart_single_container() {
  clear
  echo "======================================="
  echo "Docker Tools - Reiniciar Contenedor Único"
  echo "Entorno: $ENV"
  echo "Archivo de configuración: $COMPOSE_FILE"
  echo "======================================="
  echo ""

  # Listar contenedores activos con la etiqueta del stack
  mapfile -t containers < <(docker ps --filter "label=$LABEL_FILTER" --format "{{.ID}} {{.Names}} {{.Image}} {{.Status}}")

  if [ ${#containers[@]} -eq 0 ]; then
    echo "No se encontraron contenedores activos con la etiqueta $LABEL_FILTER."
    sleep 3
    menu
  fi

  echo " # | ID               | NOMBRE                          | IMAGEN                              | ESTADO"
  echo "---|------------------|---------------------------------|-------------------------------------|------------"

  for i in "${!containers[@]}"; do
    container=(${containers[$i]})
    #printf "%2d | %-16s | %-31s | %-35s | %-10s\n" $((i+1)) "${container[0]}" "${container[1]}" "${container[2]}" "${container[3]}"
    printf "%2d | %-16s | %-31s | %-35s | %-10s\n" \
        $((i+1)) \
        "$(truncate_text "${container[0]}" 16)" \
        "$(truncate_text "${container[1]}" 31)" \
        "$(truncate_text "${container[2]}" 35)" \
        "$(truncate_text "${container[3]}" 10)"
  done

  echo
  read -p "Seleccione el índice del contenedor a reiniciar: " index

  if ! [[ "$index" =~ ^[0-9]+$ ]] || [ "$index" -lt 1 ] || [ "$index" -gt ${#containers[@]} ]; then
    echo "Índice inválido."
    sleep 3
    menu_contenedores
  fi

  container_id=$(echo ${containers[$((index-1))]} | awk '{print $1}')
  container_name=$(echo ${containers[$((index-1))]} | awk '{print $2}')

  echo ""
  echo "Reiniciando el contenedor $container_name..."
  docker restart "$container_id" > /dev/null 2>&1 && \
    echo "Contenedor $container_name reiniciado correctamente." || \
    echo "Error al reiniciar el contenedor $container_name."

  pause
  menu_contenedores
}

build() {
  clear
  echo "======================================="
  echo "Docker Tools - Entorno: $ENV"
  echo "Archivo de configuración: $COMPOSE_FILE"
  echo "Construyendo imágenes"
  echo "======================================="
  echo ""
  docker compose -f "$COMPOSE_FILE" --env-file .env --env-file .env.$ENV build
  pause
  menu_contenedores
}

#### menu_monitoreo ######
logs() {
  clear
  echo "======================================="
  echo "Docker Tools - Entorno: $ENV"
  echo "Archivo de configuración: $COMPOSE_FILE"
  echo "Mostrando logs"
  echo "======================================="
  echo ""
  docker compose -f "$COMPOSE_FILE" --env-file .env --env-file .env.$ENV logs -f
  pause
  menu_monitoreo
}

ps() {
  clear
  echo "======================================="
  echo "Docker Tools - Entorno: $ENV"
  echo "Archivo de configuración: $COMPOSE_FILE"
  echo "Estado de los contenedores"
  echo "======================================="
  echo ""

  # Obtener la lista de contenedores con el separador personalizado
  mapfile -t containers < <(docker ps --filter "label=$LABEL_FILTER" --format "{{.ID}}#{{.Names}}#{{.Image}}#{{.Ports}}#{{.Command}}")

  if [ ${#containers[@]} -eq 0 ]; then
    echo "No se encontraron contenedores activos con la etiqueta $LABEL_FILTER."
    sleep 3
    menu_monitoreo
  fi

  # Encabezado de la tabla
  echo " # | SERVICIO                 | IMAGEN                                | PUERTO(S)                 | COMANDO"
  echo "---|--------------------------|---------------------------------------|---------------------------|-------------------------------"

  # Iterar sobre los contenedores y mostrarlos con índices
  for i in "${!containers[@]}"; do
      # Dividir la información del contenedor usando el separador #
      IFS="#" read -r id name image ports command <<< "${containers[$i]}"

      # Truncar los textos si exceden el tamaño máximo
      formatted_name=$(truncate_text "$name" 24)
      formatted_image=$(truncate_text "$image" 37)
      formatted_ports=$(truncate_text "$ports" 25)
      formatted_command=$(truncate_text "$command" 30)

      # Imprimir fila formateada
      printf "%2d | %-24s | %-37s | %-25s | %-30s\n" \
        $((i+1)) "$formatted_name" "$formatted_image" "${formatted_ports:-"N/A"}" "${formatted_command:-"N/A"}"
  done

  pause
  menu_monitoreo
}

list_stack() {
  clear
  echo "======================================="
  echo "Docker Tools - Entorno: $ENV"
  echo "Archivo de configuración: $COMPOSE_FILE"
  echo "Listando contenedores"
  echo "======================================="
  echo ""

  # Obtener la lista de contenedores en formato personalizado
  mapfile -t containers < <(docker ps --filter "label=$LABEL_FILTER" --format "{{.ID}} {{.Names}} {{.Image}} {{.Status}}")

  if [ ${#containers[@]} -eq 0 ]; then
    echo "No se encontraron contenedores activos con la etiqueta $LABEL_FILTER."
    sleep 3
    menu_monitoreo
  fi

  # Encabezado de la tabla
  echo "  # | ID               | NOMBRE                          | IMAGEN                              | ESTADO"
  echo "----|------------------|---------------------------------|-------------------------------------|------------"

  # Iterar sobre los contenedores y mostrarlos con índices
  for i in "${!containers[@]}"; do
    container=(${containers[$i]})
    #printf "%3d | %-16s | %-31s | %-35s | %-10s\n" $((i+1)) "${container[0]}" "${container[1]}" "${container[2]}" "${container[3]}"
    # Aplicar truncamiento a cada campo según el tamaño definido en printf
    printf "%3d | %-16s | %-31s | %-35s | %-10s\n" \
        $((i+1)) \
        "$(truncate_text "${container[0]}" 16)" \
        "$(truncate_text "${container[1]}" 31)" \
        "$(truncate_text "${container[2]}" 35)" \
        "$(truncate_text "${container[3]}" 10)"
  done

  pause
  menu_monitoreo
}

exec_stack() {
  clear
  echo "======================================="
  echo "Docker Tools - Entorno: $ENV"
  echo "Archivo de configuración: $COMPOSE_FILE"
  echo "Listando contenedores $LABEL_FILTER"
  echo "======================================="
  echo ""
  mapfile -t containers < <(docker ps --filter "label=$LABEL_FILTER" --format "{{.ID}} {{.Names}} {{.Image}} {{.Status}}")

  if [ ${#containers[@]} -eq 0 ]; then
    echo "No se encontraron contenedores con la etiqueta $LABEL_FILTER."
    sleep 3
    menu_monitoreo
  fi

  echo " # | ID               | NOMBRE                          | IMAGEN                              | ESTADO"
  echo "---|------------------|---------------------------------|-------------------------------------|------------"

  for i in "${!containers[@]}"; do
    container=(${containers[$i]})

    # Aplicar truncamiento a cada campo según el tamaño definido en printf
    printf "%2d | %-16s | %-31s | %-35s | %-10s\n" \
        $((i+1)) \
        "$(truncate_text "${container[0]}" 16)" \
        "$(truncate_text "${container[1]}" 31)" \
        "$(truncate_text "${container[2]}" 35)" \
        "$(truncate_text "${container[3]}" 10)"
  done

  # Agregar opción para volver al menú con formato alineado
  exit_index=$(( ${#containers[@]} + 1 ))
  echo "-----------------------------------------------------------------------------------------------------------"
  printf "%2d | %-40s\n" "$exit_index"  "$(truncate_text "     << Volver al menú >>" 30) " 
  echo
  read -p "Seleccione el índice del contenedor (o $exit_index para volver): " index

  # Si el usuario elige la opción de salir, volver al menú
  if [[ "$index" == "$exit_index" ]]; then
      menu_monitoreo
  fi

  if ! [[ "$index" =~ ^[0-9]+$ ]] || [ "$index" -lt 1 ] || [ "$index" -gt ${#containers[@]} ]; then
    echo "Índice inválido."
    sleep 3
    menu_monitoreo
  fi

  container_id=$(echo ${containers[$((index-1))]} | awk '{print $1}')
  container_name=$(echo ${containers[$((index-1))]} | awk '{print $2}')

  echo ""
  echo "Conectando al contenedor $container_name..."

  echo "Verificando shell disponible..."
  if docker exec "$container_id" bash -c "echo Bash disponible" 2&>/dev/null; then
    echo "Abriendo terminal con bash..."
    echo ""
    docker exec -it "$container_id" bash
  elif docker exec "$container_id" sh -c "echo SH disponible" 2&>/dev/null; then
    echo "Bash no disponible. Abriendo terminal con sh..."
    echo ""
    docker exec -it "$container_id" sh
  else
    echo "No se pudo abrir una terminal en el contenedor $container_name."
  fi
  pause
  menu_monitoreo
}

#### menu_limpieza ######
clean() {
  clear
  echo "======================================="
  echo "Docker Tools - Entorno: $ENV"
  echo "Archivo de configuración: $COMPOSE_FILE"
  echo "Limpiando contenedores, redes, imágenes y volúmenes"
  echo "======================================="
  echo ""
  docker compose -f "$COMPOSE_FILE" --env-file .env --env-file .env.$ENV down --rmi all --volumes --remove-orphans
  pause
  menu_limpieza
}

clean_images() {
  clear
  echo "======================================="
  echo "Docker Tools - Entorno: $ENV"
  echo "Archivo de configuración: $COMPOSE_FILE"
  echo "Limpiando imágenes no utilizadas"
  echo "======================================="
  echo ""
  docker image prune -af
  pause
  menu_limpieza
}

clean_volumes() {
  clear
  echo "======================================="
  echo "Docker Tools - Entorno: $ENV"
  echo "Archivo de configuración: $COMPOSE_FILE"
  echo "Limpiando volúmenes no utilizados"
  echo "======================================="
  echo ""
  docker volume prune -f
  pause
  menu_limpieza
}

clean_all() {
  clear
  echo "======================================="
  echo "Docker Tools - Entorno: $ENV"
  echo "Archivo de configuración: $COMPOSE_FILE"
  echo "Limpieza Completa"
  echo "======================================="
  echo ""

  # Limpiar contenedores, imágenes, redes y volúmenes relacionados con el stack
  echo "======================================="
  echo "Limpiando contenedores, redes, imágenes y volúmenes del stack..."
  echo "======================================="
  docker compose -f "$COMPOSE_FILE" --env-file .env --env-file .env.$ENV down --rmi all --volumes --remove-orphans

  # Verificar y eliminar volúmenes huérfanos
  echo "======================================="
  echo "Verificando volúmenes huérfanos relacionados con el stack..."
  echo "======================================="
  mapfile -t stack_volumes < <(docker volume ls --filter "dangling=true" --filter "label=$LABEL_FILTER" --format "{{.Name}}")

  if [ ${#stack_volumes[@]} -gt 0 ]; then
    echo "Los siguientes volúmenes serán eliminados:"
    for volume in "${stack_volumes[@]}"; do
      echo " - $volume"
    done

    # Eliminar volúmenes relacionados con el stack
    for volume in "${stack_volumes[@]}"; do
      docker volume rm "$volume"
    done
  else
    echo "No se encontraron volúmenes huérfanos relacionados con el stack."
  fi

  # Eliminar imágenes no utilizadas
  echo "======================================="
  echo "Limpiando imágenes no utilizadas..."
  echo "======================================="
  docker image prune -af

  # Eliminar caché de builds generadas
  echo "======================================="
  echo "Limpiando caché de builds generadas..."
  echo "======================================="
  docker builder prune -af

  echo ""
  echo "======================================="
  echo "Limpieza completada."
  echo "======================================="
  pause
  menu_limpieza
}

drop_persistence() {
  clear
  echo "======================================="
  echo "Docker Tools - Entorno: $ENV"
  echo "⚠️  ADVERTENCIA: Esta acción eliminará las persistencias de los contenedores."
  echo "   Se borrarán los datos almacenados de los siguientes Servicios/Contenedores,"
  echo "   solo si no están en ejecución:"
  echo "======================================="
  echo " - mailpit"
  echo " - mariadb"
  echo " - minio"
  echo " - rabbitmq"
  echo " - redis"
  echo " - redisinsight"
  echo " - frontend (node_modules, package-lock.json)"
  echo ""

  # Definir colores
  GREEN="\e[32m"
  RED="\e[31m"
  NC="\e[0m"  # Reset color

  read -p "¿Seguro que deseas continuar? (S/N): " confirm
  case "$confirm" in
    [sS]) 
      echo "Verificando contenedores en ejecución..."
      
      # Obtener la lista de nombres de contenedores activos
      mapfile -t active_containers < <(docker ps --format "{{.Names}}")

      for service in mailpit mariadb minio rabbitmq redis redisinsight; do
        # Buscar si hay algún contenedor cuyo nombre contenga el nombre del servicio
        if printf "%s\n" "${active_containers[@]}" | grep -q "$service"; then
          echo -e "⏳ ${service} está en ejecución. ${RED}[NO SE ELIMINA]${NC}"
        else
          echo -n "Eliminando persistencia servicio/contenedor: ${service}..."
          if [ -d "volumes/$service" ]; then
            rm -rf "volumes/$service" 2>/dev/null
            if [ $? -eq 0 ]; then
              echo -e " ${GREEN}[OK]${NC}"
            else
              echo -e " ${RED}[Error al eliminar]${NC}"
            fi
          else
            echo -e " ${RED}[No existe]${NC}"
          fi
        fi
      done

      # Eliminar node_modules de frontend
      echo -n "Eliminando node_modules de frontend..."
      if [ -d "frontend/node_modules" ]; then
        rm -rf "frontend/node_modules" 2>/dev/null
        if [ $? -eq 0 ]; then
          echo -e " ${GREEN}[OK]${NC}"
        else
          echo -e " ${RED}[Error al eliminar]${NC}"
        fi
      else
        echo -e " ${RED}[No existe]${NC}"
      fi

      # Eliminar package-lock.json de frontend
      echo -n "Eliminando package-lock.json de frontend..."
      if [ -f "frontend/package-lock.json" ]; then
        rm -f "frontend/package-lock.json" 2>/dev/null
        if [ $? -eq 0 ]; then
          echo -e " ${GREEN}[OK]${NC}"
        else
          echo -e " ${RED}[Error al eliminar]${NC}"
        fi
      else
        echo -e " ${RED}[No existe]${NC}"
      fi

      echo ""
      echo "======================================="
      echo -e "${GREEN}✅ Limpieza completada.${NC}"
      echo "======================================="
      pause
      menu_limpieza
      ;;
    *)
      echo "Operación cancelada."
      pause
      menu_limpieza
      ;;
  esac
}

#### menu_configuracion ######
change_env() {
  clear
  echo "======================================="
  echo "Docker Tools - Entorno: $ENV"
  echo "Archivo de configuración: $COMPOSE_FILE"
  echo "Cambiar entorno actual (dev, qa, prd)"
  echo "======================================="
  echo ""
  read -p "Ingrese el nuevo entorno: " new_env
  if [ -z "$new_env" ]; then
    echo "El entorno no puede estar vacío."
    sleep 3
    menu_configuracion
  fi
  ENV="$new_env"
  define_compose_file
  echo "Entorno cambiado a: $ENV"
  sleep 3
  menu_configuracion
}

# Función para el menú de actualización de IP
update_ip_menu() {
    clear
    echo "======================================="
    echo "Docker Tools - Actualizar IP"
    echo "Entorno: $ENV"
    echo "Archivo: $COMPOSE_FILE"
    echo "======================================="
    echo ""
    
    local current_ip=$(get_current_ip)
    
    if [[ -z "$current_ip" ]]; then
        echo "❌ No se pudo detectar la IP actual del equipo."
        echo "Puede intentar configurarla manualmente."
        echo ""
        read -p "¿Desea ingresar la IP manualmente? (S/N): " manual_ip
        
        if [[ $manual_ip =~ ^[Ss]$ ]]; then
            read -p "Ingrese la IP: " manual_ip_value
            if [[ -n "$manual_ip_value" ]]; then
                update_ip_in_compose "$manual_ip_value" "$COMPOSE_FILE"
            else
                echo "❌ IP vacía. Operación cancelada."
            fi
        fi
    else
        echo "🌐 IP actual detectada: $current_ip"
        echo ""
        
        # Verificar IP actual en el compose
        if [[ -f "$COMPOSE_FILE" ]]; then
            local compose_ip=$(grep "REACT_NATIVE_PACKAGER_HOSTNAME=" "$COMPOSE_FILE" | cut -d'=' -f2 | tr -d ' ')
            echo "📄 IP en $COMPOSE_FILE: $compose_ip"
            echo ""
            
            if [[ "$compose_ip" == "$current_ip" ]]; then
                echo "✅ Las IPs coinciden. No es necesario actualizar."
            else
                echo "⚠️  Las IPs no coinciden."
                read -p "¿Desea actualizar la IP en $COMPOSE_FILE? (S/N): " confirm
                
                if [[ $confirm =~ ^[Ss]$ ]]; then
                    update_ip_in_compose "$current_ip" "$COMPOSE_FILE"
                else
                    echo "Operación cancelada."
                fi
            fi
        else
            echo "❌ El archivo $COMPOSE_FILE no existe."
        fi
    fi
    
    pause
    menu_configuracion
}

# Función para el menú de verificación de IP
check_ip_menu() {
    clear
    echo "======================================="
    echo "Docker Tools - Verificar IP"
    echo "Entorno: $ENV"
    echo "Archivo: $COMPOSE_FILE"
    echo "======================================="
    echo ""
    
    local current_ip=$(get_current_ip)
    
    if [[ -n "$current_ip" ]]; then
        echo "🌐 IP actual del equipo: $current_ip"
        
        # Mostrar información de red adicional
        echo ""
        echo "📡 Información de red:"
        if command -v hostname &> /dev/null; then
            echo "   Hostname: $(hostname 2>/dev/null || echo 'No disponible')"
        fi
        
        # Verificar IP en compose
        if [[ -f "$COMPOSE_FILE" ]]; then
            local compose_ip=$(grep "REACT_NATIVE_PACKAGER_HOSTNAME=" "$COMPOSE_FILE" | cut -d'=' -f2 | tr -d ' ')
            echo "📄 IP en $COMPOSE_FILE: $compose_ip"
            
            if [[ "$compose_ip" == "$current_ip" ]]; then
                echo "✅ Estado: Las IPs coinciden"
            else
                echo "⚠️  Estado: Las IPs NO coinciden"
                echo "   Considere actualizar la IP usando la opción 17 del menú principal."
            fi
        else
            echo "❌ El archivo $COMPOSE_FILE no existe."
        fi
        
        # Mostrar interfaces de red disponibles
        echo ""
        echo "🔍 Interfaces de red disponibles:"
        if command -v ip &> /dev/null; then
            ip addr show | grep "inet " | grep -v "127.0.0.1" | awk '{print "   " $2}' | cut -d'/' -f1
        elif command -v ifconfig &> /dev/null; then
            ifconfig | grep "inet " | grep -v "127.0.0.1" | awk '{print "   " $2}'
        else
            echo "   No se pueden mostrar las interfaces de red"
        fi
        
    else
        echo "❌ No se pudo detectar la IP actual del equipo."
        echo ""
        echo "💡 Métodos de detección probados:"
        echo "   - ip route"
        echo "   - hostname -I"
        echo "   - ifconfig"
        echo "   - netstat"
        echo ""
        echo "Puede configurar la IP manualmente usando la opción 17 del menú principal."
    fi
    
    pause
    menu_configuracion
}


#### menu_expo ######
iniciar_expo() {
  clear
  echo "======================================="
  echo "Docker Tools - Iniciar Expo Manualmente"
  echo "Label filter: $LABEL_FILTER"
  echo "======================================="
  echo ""

  # Buscar contenedores relacionados con Expo
  mapfile -t containers < <(docker ps --filter "label=$LABEL_FILTER" --format "{{.ID}} {{.Names}} {{.Image}}" | grep -i "expo")

  if [ ${#containers[@]} -eq 0 ]; then
    echo "❌ No se encontraron contenedores relacionados con Expo."
    pause
    menu_expo
  fi

  # Si hay más de un contenedor, permitir selección
  if [ ${#containers[@]} -gt 1 ]; then
    echo "Se encontraron múltiples contenedores relacionados con Expo:"
    for i in "${!containers[@]}"; do
      container=(${containers[$i]})
      printf "%2d | %-16s | %-30s\n" \
        $((i+1)) "$(truncate_text "${container[0]}" 16)" "$(truncate_text "${container[1]}" 30)"
    done
    echo
    read -p "Seleccione el índice del contenedor: " index

    if ! [[ "$index" =~ ^[0-9]+$ ]] || [ "$index" -lt 1 ] || [ "$index" -gt ${#containers[@]} ]; then
      echo "❌ Índice inválido."
      pause
      menu_expo
    fi

    container_id=$(echo "${containers[$((index-1))]}" | awk '{print $1}')
    container_name=$(echo "${containers[$((index-1))]}" | awk '{print $2}')
  else
    container_id=$(echo "${containers[0]}" | awk '{print $1}')
    container_name=$(echo "${containers[0]}" | awk '{print $2}')
    echo "✅ Contenedor encontrado: $container_name"
  fi

  echo
  echo "🔍 Verificando shell disponible en $container_name..."

  if docker exec "$container_id" bash -c "echo Bash disponible" &>/dev/null; then
    shell="bash"
  elif docker exec "$container_id" sh -c "echo SH disponible" &>/dev/null; then
    shell="sh"
  else
    echo "❌ No se pudo determinar una shell disponible en el contenedor."
    pause
    menu_expo
  fi

  echo "✅ Shell detectada: $shell"
  echo
  echo "🚀 Ejecutando /scripts/start-expo.sh en $container_name..."
  echo
  echo "    docker exec -it $container_name $shell -c \"bash /scripts/start-expo.sh\""
  echo

  docker exec -it "$container_id" $shell -c "bash /scripts/start-expo.sh"

  pause
  menu_expo
}


#### System ######
exit_script() {
  clear
  echo "======================================="
  echo "Gracias por usar Docker Tools v1."
  echo "Todos los procesos han sido cerrados correctamente."
  echo "======================================="
  exit 0
}

pause() {
  read -p "Presione Enter para continuar..."
}

# Ejecutar menú
menu
