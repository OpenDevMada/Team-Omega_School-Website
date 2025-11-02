# Multi-stage build for Spring Boot application

# Stage 1: Build the application
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom.xml and download dependencies (this layer will be cached if pom.xml doesn't change)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create a non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port (default Spring Boot port)
EXPOSE 8080

# Health check to ensure the application is running
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Run the application, binding explicitly to 0.0.0.0 to open port 8080 on all interfaces
ENTRYPOINT ["java", "-jar", "app.jar", "--server.address=0.0.0.0"]

