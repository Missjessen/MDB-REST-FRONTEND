// src/types/global.d.ts

declare global {
    interface Window {
      google: typeof google
    }
  
    namespace google {
      namespace picker {
        class DocsView {
          constructor(viewId: string)
        }
        // declare global {
        //     const gapi: typeof import('gapi-client')
        //   }
          declare global {
            const gapi: any
          }
          
        
          
  
        class PickerBuilder {
          addView(view: DocsView): this
          setOAuthToken(token: string): this
          setDeveloperKey(key: string): this
          setCallback(callback: (data: PickerResponse) => void): this
          build(): Picker
        }
  
        interface Picker {
          setVisible(visible: boolean): void
        }
  
        interface PickerResponse {
            action: string
            docs?: Array<{
              id: string
              name: string
              mimeType: string
              url?: string
              iconUrl?: string
            }>
          }
  
        const ViewId: {
          SPREADSHEETS: string
        }
  
        const Action: {
          PICKED: string
          CANCEL: string
        }
      }
    }
  }
  
  export {}
  