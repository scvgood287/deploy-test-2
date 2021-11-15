import {atom} from 'jotai'

const selectedImage = atom();
const selectedFile = atom();
const readyToPostFileAtom = atom([]);
const uploadedFilesLengthAtom = atom();
const uploadFiles = atom();

export {selectedFile, selectedImage, readyToPostFileAtom, uploadedFilesLengthAtom, uploadFiles};