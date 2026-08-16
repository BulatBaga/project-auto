'use client'

import { useEffect, useRef } from 'react'

export default function OfficeMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let map: any = null

    const initMap = async () => {
      if (!mapRef.current) return

      const L = await import('leaflet')

      // Подключаем стили Leaflet только в браузере
      await import('leaflet/dist/leaflet.css')

      if (!mapRef.current) return

      map = L.map(mapRef.current, {
        center: [54.741756, 55.993272],
        zoom: 17,
        scrollWheelZoom: true,
      })

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors',
        }
      ).addTo(map)

      // Бирюзовая метка в стиле автосалона
      const officeIcon = L.divIcon({
        className: '',
        html: `
          <div style="
            width: 46px;
            height: 58px;
            position: relative;
          ">
            <div style="
              position: absolute;
              left: 50%;
              top: 0;
              width: 42px;
              height: 42px;
              background: #18e0d0;
              border: 3px solid #07100f;
              border-radius: 50% 50% 50% 0;
              transform: translateX(-50%) rotate(-45deg);
              box-shadow:
                0 0 0 5px rgba(24,224,208,.16),
                0 8px 25px rgba(24,224,208,.45);
            ">
              <div style="
                position: absolute;
                left: 50%;
                top: 50%;
                width: 12px;
                height: 12px;
                background: #07100f;
                border-radius: 50%;
                transform: translate(-50%, -50%) rotate(45deg);
              "></div>
            </div>
          </div>
        `,
        iconSize: [46, 58],
        iconAnchor: [23, 54],
      })

      L.marker(
        [54.741756, 55.993272],
        { icon: officeIcon }
      )
        .addTo(map)
        .bindPopup(`
          <strong>Автосалон База</strong>

          г. Уфа, ул. Комсомольская, 15
        `)
    }

    initMap()

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [])

  return (
    <div
      ref={mapRef}
      className="h-full w-full"
      style={{
        minHeight: '400px',
      }}
    />
  )
}