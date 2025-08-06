# Usa una imagen base de Nginx
FROM nginx:latest

# Copia los archivos de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia los certificados SSL
COPY ssl /etc/nginx/ssl

# Exponer los puertos 3001 y 3002
EXPOSE 80
EXPOSE 443

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]