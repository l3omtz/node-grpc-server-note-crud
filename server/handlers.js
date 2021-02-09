import grpc from '@grpc/grpc-js'
import { notes } from '../db.js';
import { v1 } from 'uuid';

/**
 * @param {*} call 
 * Request from client
 * @param {*} callback
 * function we will invoke to return the response to the client
 */


export const list = (call, callback) => {
    callback(null, { notes });
}

export const get = (call, callback) => {
    let existingNoteIndex = notes.findIndex((n) => n.id == call.request.id);
    if (existingNoteIndex != -1) {
        callback(null, notes[existingNoteIndex])
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: call.request.id + " not found"
        })
    }
}

export const insert = (call, callback) => {
    let note = call.request;
    note.id = v1()
    notes.push(note)
    callback(null, note)
}

export const update = (call, callback) => {
    let existingNote = notes.find((n) => n.id == call.request.id)
    if (existingNote) {
        existingNote.title = call.request.title
        existingNote.content = call.request.content
        callback(null, existingNote)         
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        })
    }
}

export const deleteNote = (call, callback) => {
    let existingNoteIndex = notes.findIndex((n) => n.id == call.request.id);
    if (existingNoteIndex != -1) {
        notes.splice(existingNoteIndex, 1)
        callback(null, {})
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        })
    }
}