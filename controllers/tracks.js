const { response, request } = require('express');
const moment = require('moment');
const axios  = require('axios');
const _      = require('lodash');

/**
 *  Busca las canciones del artista enviado.
 *  El limite de canciones por defecto es de 25
 * @returns 
 */
const searchTrack = async(req = request, res = response) => {
    const { name = null, limit = 25, media = 'music' } = req.query;

    // Valida que exista el nombre del artista
    if(!String(name).trim().length)
        return res.json({ 
            status: false, 
            message: 'Debes ingresar el nombre de la banda!', 
            data: {}
        });

        
    // Obtiene las canciones desde iTunes
    const configParams = {
        method: 'get', 
        url: `${process.env.API_ITUNES}/search?term=${name.toLowerCase()}&media=${media}&limit=${limit}` 
    }
    
    const _rawSongs = await axios(configParams)
        .then((response) => response && response.data)
        .catch((err) => { return [] })

    // Si no existen resultados, se informa de esto
    if(!_rawSongs || (_rawSongs.results && !_rawSongs.results.length)) 
        return res.json({ 
            status: false, 
            message: 'No se encontraron resultados =(', 
            data: {}
        });

    // Obtiene todos los albunes diferentes sin elementos duplicados.
    const albums = [
        ...new Set((
            _.cloneDeep(_rawSongs.results)
        ).map((song) => song.collectionName ))
    ]

    // Se arma la estructura de respuesta solicitada
    const songs = (_rawSongs.results).map((song) => {
        return {
            cancion_id:     song.trackId,
            nombre_album:   song.collectionName,
            nombre_tema:    song.trackName,
            preview_url:    song.previewUrl,
            fecha_lanzamiento: moment(song.releaseDate).format('YYYY-MM-DD'),
            precio: {
                valor:  song.trackPrice || 0,
                moneda: song.currency
            }
        }
    })

    //TEST Cache
    // await new Promise(resolve => { setTimeout(() => { resolve(true) }, 3000)})
    
    res.json({
        status: false, 
        message: 'Canciones', 
        data: {
            total_albumes: albums.length,
            total_canciones: songs.length,
            albumes: albums,
            canciones: songs
        }
    });
}


module.exports = { 
    searchTrack
}