# Galaxia lejana

Un simulador simple de un sistema planetario que analiza las condiciones de tiempo segun las posicion de los planetas.


## Utilización

 * Instalar dependencias con el comando:
```
npm install
```

Ejecutar  
```
node farAwayGalaxy.js
```

Se imprimira en pantalla el resultado en pantalla
``` javascript
Dias: 3650
Resultados:  {"periodos_sequia":X,"periodos_lluvia":X,"dia_mas_lluvia":X,"periodos_optimos":X}
```

Los días se pueden configurar modificando la variable *PREDICTION_DAYS* que se encuentra en el archivo **farAwayGalaxy.js** (linea 5)

## Estructura

* **farAwayGalaxy.js:** contiene el codigo que calcula las condiciones para una cantidad de dias y analisis de periodos por estaciones.

* **solarSystem.js:** contiene el modelo de datos del sistema sola y como calular las condiciones climaticas segun el dia.

* **algebra.js:** contiene toda la logica para el calculo de las posiciones de los planetas

