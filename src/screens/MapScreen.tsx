import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import MapView, { UrlTile, Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { Compass, MapPin, Car, Clock } from "lucide-react-native";
import { IconButton } from "../components/IconButton";
import axios from "axios";

interface Coord {
  latitude: number;
  longitude: number;
}

interface Region extends Coord {
  latitudeDelta: number;
  longitudeDelta: number;
}

export function MapScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);

  // Estado para guardar os pontos da linha da rota
  const [routeCoordinates, setRouteCoordinates] = useState<Coord[]>([]);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
  } | null>(null);

  const mapRef = useRef<MapView>(null);

  // Destino estático de teste (Vais ajustar este ponto para um local perto de ti se quiseres)
  const [destination, setDestination] = useState<Coord>({
    latitude: -8.845, // Ajusta ligeiramente perto da tua latitude real se necessário
    longitude: 13.295,
  });

  // Função assíncrona que consome a API do OSRM para traçar a rota
  async function fetchRoute(origin: Coord, dest: Coord) {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${dest.longitude},${dest.latitude}?overview=full&geometries=geojson`;

      const response = await axios.get(url);

      if (response.data.routes && response.data.routes.length > 0) {
        const route = response.data.routes[0];

        // Converte a geometria da rota
        const coordinates = route.geometry.coordinates.map(
          (point: number[]) => ({
            latitude: point[1],
            longitude: point[0],
          }),
        );

        setRouteCoordinates(coordinates);

        // Conversões: metros para km, e segundos para minutos
        const distanceKm = (route.distance / 1000).toFixed(1); // Ex: 4.2 km
        const durationMin = Math.round(route.duration / 60); // Ex: 12 min

        setRouteInfo({
          distance: `${distanceKm} km`,
          duration: `${durationMin} min`,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar rota OSRM:", error);
    }
  }

  useEffect(() => {
    async function getInitialLocation() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setHasPermission(false);
          setLoading(false);
          return;
        }
        setHasPermission(true);

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const newRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.03, // Um pouco mais aberto para ver a rota toda
          longitudeDelta: 0.03,
        };

        setCurrentRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);

        // Dispara a busca da rota ligando a tua posição atual ao destino fixado
        const originCoord = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        // Dynamic Quick-Fix: Definir o destino dinamicamente perto de ti para o teste funcionar sempre
        const mockDest = {
          latitude: location.coords.latitude + 0.005,
          longitude: location.coords.longitude + 0.005,
        };
        setDestination(mockDest);

        await fetchRoute(originCoord, mockDest);
      } catch (error) {
        console.error("Erro ao obter localização:", error);
      } finally {
        setLoading(false);
      }
    }

    getInitialLocation();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.messageText}>A calcular rota do GPS...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: -8.839988,
          longitude: 13.289437,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="none"
        // Evento que captura o clique do utilizador no mapa
        onPress={(event) => {
          const clickedCoord = event.nativeEvent.coordinate;

          // 1. Atualiza a posição do marcador vermelho
          setDestination(clickedCoord);

          // 2. Se o GPS já tiver encontrado a nossa posição, calcula a nova rota
          if (currentRegion) {
            fetchRoute(
              {
                latitude: currentRegion.latitude,
                longitude: currentRegion.longitude,
              },
              clickedCoord,
            );
          }
        }}
      >
        {/* Camada de imagens do mapa (CartoDB/OpenStreetMap) */}
        <UrlTile
          urlTemplate="https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png"
          maximumZ={19}
          tileSize={256}
        />

        {/* Marcador 1: A tua Posição Atual (Origem) */}
        {currentRegion && (
          <Marker
            coordinate={currentRegion}
            title="Origem"
            description="Minha posição atual"
          >
            <View style={styles.markerContainer}>
              <MapPin size={32} color="#0000ff" fill="#b3c6ff" />
            </View>
          </Marker>
        )}

        {/* Marcador 2: O Ponto de Destino Clidado */}
        <Marker
          coordinate={destination}
          title="Destino Selecionado"
          description="Ponto de chegada da rota"
        >
          <View style={styles.markerContainer}>
            <MapPin size={32} color="#ff0000" fill="#ffb3b3" />
          </View>
        </Marker>

        {/* Desenha a linha da rota pelas ruas se houver coordenadas */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#1d4ed8" // Azul escuro destacado
            strokeWidth={4} // Espessura ideal para visualização móvel
          />
        )}
      </MapView>

      {/* Card Flutuante de Informações da Rota */}
      {routeInfo && (
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Car size={20} color="#1d4ed8" />
            <Text style={styles.infoText}>{routeInfo.distance}</Text>
          </View>

          <View style={styles.infoDivider} />

          <View style={styles.infoItem}>
            <Clock size={20} color="#1d4ed8" />
            <Text style={styles.infoText}>{routeInfo.duration}</Text>
          </View>
        </View>
      )}

      {/* Botão flutuante paraRecentrar o mapa no utilizador */}
      {currentRegion && (
        <View style={styles.controlsContainer}>
          <IconButton
            icon={Compass}
            onPress={() => mapRef.current?.animateToRegion(currentRegion, 1000)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  map: { width: "100%", height: "100%" },
  markerContainer: { alignItems: "center", justifyContent: "center" },
  controlsContainer: { position: "absolute", bottom: 30, right: 20 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  messageText: { marginTop: 10, fontSize: 16, color: "#333" },
  infoCard: {
    position: "absolute",
    top: 50, // Posiciona logo abaixo da barra de status
    left: 20,
    right: 20,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // Espaçamento entre o ícone e o texto
  },
  infoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  infoDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#e5e7eb", // Linha cinza subtil para separar os dados
  },
});
