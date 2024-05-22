
//modelo de departamento

import mongoose from "mongoose";
const Schema = mongoose.Schema;
const departamentoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    cantidadProfesores: {
        type: Number,
        required: true
        default: 0
    }
    
    }