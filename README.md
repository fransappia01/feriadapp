# Feriadapp

App minimalista para ver cuántos días faltan hasta el próximo feriado en Argentina y explorar el calendario completo.

## Características

- **Contador grande** con los días restantes hasta el próximo feriado nacional
- **Modo claro y oscuro** con switch en la esquina superior derecha
- **Calendario mensual** con feriados marcados por tipo (inamovible, trasladable, turístico/puente)
- **Widget de pantalla de inicio** (iOS y Android) con el número de días en grande
- **PWA instalable** desde Chrome, Edge o Safari — ícono en pantalla de inicio, modo app y datos offline
- **Lista de próximos feriados**
- Diseño mobile-first, listo para empaquetar como app nativa

## Datos

Los feriados se obtienen desde [ArgentinaDatos API](https://argentinadatos.com/docs/operations/get-feriados), que refleja el calendario oficial publicado en [argentina.gob.ar](https://www.argentina.gob.ar/jefatura/feriados-nacionales-2026).

## Desarrollo

```bash
npm install
npm run dev
```

Abrí [http://localhost:5173](http://localhost:5173) en el navegador.

### Probar la PWA (instalable)

La PWA funciona en build de producción. Para probarla localmente:

```bash
npm run build
npm run preview
```

Abrí la URL que muestra `preview` (ej. http://localhost:4173) y:

- **Android / desktop Chrome:** usá el botón **Instalar app** dentro de la app o el ícono en la barra de direcciones.
- **iPhone Safari:** Compartir → **Agregar a pantalla de inicio**.

Instalada, la app abre a pantalla completa con ícono propio, guarda feriados en caché y funciona sin conexión si ya los cargaste antes.

## Build

```bash
npm run build
npm run preview
```

## Publicar como app móvil

Este proyecto usa **Vite + React + Capacitor** para generar builds de Android (Play Store) e iOS (App Store):

```bash
npm run build:mobile
npx cap open ios     # requiere Mac con Xcode
npx cap open android
```

### Widget en iOS

1. Abrí el proyecto en Xcode (`npx cap open ios`).
2. En **Signing & Capabilities** de los targets **App** y **FeriadappWidgetExtension**, activá el App Group `group.com.feriadapp.app` (Xcode puede pedirte crearlo en tu Apple Developer account).
3. Compilá e instalá la app en tu iPhone.
4. Abrí Feriadapp al menos una vez para cargar los feriados.
5. Mantené presionada la pantalla de inicio → **+** → buscá **Feriadapp** → elegí tamaño pequeño o mediano.

El widget muestra el número grande, la etiqueta “días” y el nombre del próximo feriado. Se actualiza al abrir la app y cada hora.

### Widget en Android

1. Compilá e instalá la app en tu celular.
2. Abrí Feriadapp al menos una vez (carga los feriados).
3. Mantené presionada la pantalla de inicio → **Widgets** → **Feriadapp**.
4. El widget muestra el número grande de días y el nombre del próximo feriado.

El widget se actualiza automáticamente al abrir la app y cada 30 minutos en segundo plano.

## Requisitos iOS

- Mac con Xcode 15+
- Cuenta de Apple Developer (gratuita alcanza para probar en tu dispositivo)
- App Group `group.com.feriadapp.app` habilitado en ambos targets

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- date-fns
