import useApi from '../Fetcher/useAPI'
import * as getEndpoint from '../../network/EndPoints'
import axios from 'axios'

const useUpload = () => {
  const { callApi } = useApi()

  const uploadFile = async (file: any, intent: string): Promise<string> => {
    const extractPath = (url: string): string => {
      try {
        const urlObject = new URL(url)
        const fullPath = urlObject.pathname
        const desiredPath = fullPath.substring(fullPath.indexOf('vendor'))

        return desiredPath
      } catch (error) {
        // consoleerror('Invalid URL:', error)
        return ''
      }
    }

    try {
      const fileName = file.name
      const fileType = file.type.split('/')[0]
      const response = (await callApi(
        `/${getEndpoint.default.GET_MEDIA}?fileName=${fileName}&fileType=${fileType}&intent=${intent}`,
        'GET',
        file
      )) as any

      const extractedPath = extractPath(response.data.url)
      // setExtractPathUrl(extractedPath)
     // // console.log('imageResponse', response, extractedPath, response.data.url)

      if (response.error == '') {
        const uploadS3 = await axios(response?.data?.url, {
          method: 'PUT',
          data: file,
          headers: {
            'Content-Type': fileType
          }
        })

       // // console.log('IMG S3---', uploadS3)
      }

      return extractedPath
    } catch (err) {
     // // console.log('err', err)
      throw err
    }
  }

  return uploadFile
}

export default useUpload
