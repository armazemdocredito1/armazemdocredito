const dataURIToFile = (dataURI: string, fileName: string) => {
  const bytes =
    dataURI.split(',')[0].indexOf('base64') >= 0
      ? atob(dataURI.split(',')[1])
      : unescape(dataURI.split(',')[1])
  const mime = dataURI.split(',')[0].split(':')[1].split(';')[0]
  const max = bytes.length
  const ia = new Uint8Array(max)
  for (var i = 0; i < max; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  const newBlob = new Blob([ia], { type: mime })

  return new File([newBlob], fileName)
}

const loadImage = (imageSrc): Promise<HTMLImageElement> => {
  return new Promise((resolve: Function) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.src = imageSrc
  })
}

const resize = (image: HTMLImageElement, maxSize: number) => {
  const canvas = document.createElement('canvas')

  let width = image.width
  let height = image.height

  if (width > height) {
    if (width > maxSize) {
      height *= maxSize / width
      width = maxSize
    }
  } else {
    if (height > maxSize) {
      width *= maxSize / height
      height = maxSize
    }
  }

  canvas.width = width
  canvas.height = height
  canvas.getContext('2d').drawImage(image, 0, 0, width, height)
  return canvas.toDataURL('image/jpeg')
}

export const resizeImage = (file: File, maxSize: number) => {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    if (!file.type.match(/image.*/)) {
      reject(new Error('Not an image'))
      return
    }

    reader.onload = async (readerEvent: any) => {
      const dataURI = resize(
        await loadImage(readerEvent.target.result),
        maxSize
      )
      resolve(dataURIToFile(dataURI, file.name))
    }
    reader.readAsDataURL(file)
  })
}
