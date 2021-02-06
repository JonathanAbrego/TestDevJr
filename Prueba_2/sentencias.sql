/*
registros con tipo de llamada Cel LD durante el mes febrero
*/
SELECT * FROM logDial
WHERE  tipoDeLlamada = 'Cel LD' and month(fechaDeLlamada)=2;

/*
promedio de tiempo de dialogo de las llamadas con tipo
Cel LD  durante el mes de febrero
*/
SELECT AVG(tiempoDialogo) AS PromedioLlamadas
FROM logDial
WHERE  tipoDeLlamada = 'Cel LD' and month(fechaDeLlamada)=2;

/*
número en minutos de dialogo (tomando tiempoDialogo que está en segundos)
y el costo de todas las llamadas del mes de enero
*/
SELECT SUM(tiempoMinutos) AS totalMinutos,
       SUM(costo*TiempoMinutos)AS costoTotal
FROM
	(SELECT SUM((tiempoDialogo)/60) AS tiempoMinutos,
       		tipoDeLlamada
	 FROM logDial
     WHERE month(fechaDeLlamada)=1
     GROUP BY TipoDeLlamada)
AS t1
INNER JOIN costos
ON t1.TipoDeLlamada = costos.TipoDeLlamada;

/*
Total independiente por cada tipo de llamada

SELECT
	t1.tipoDeLlamada,
    costo,
	(tiempoMinutos) AS totalMinutos,
    (costo*TiempoMinutos)AS costoTotal
FROM
	(SELECT SUM((tiempoDialogo)/60) AS tiempoMinutos,
       		tipoDeLlamada
	 FROM logDial
     WHERE month(fechaDeLlamada)=1
     GROUP BY TipoDeLlamada)
AS t1
INNER JOIN costos
ON t1.TipoDeLlamada = costos.TipoDeLlamada;
*/
