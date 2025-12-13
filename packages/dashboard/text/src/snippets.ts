import type { Snippet } from '@easy-editor/core'

const snippets: Snippet[] = [
  {
    title: 'Text',
    screenshot: 'https://img.alicdn.com/imgextra/i3/O1CN01n5wpxc1bi862KuXFz_!!6000000003498-55-tps-50-50.svg',
    schema: {
      componentName: 'Text',
      props: {
        text: 'Text Text Text',
        fontSize: 14,
        color: '#000000',
        textAlign: 'left',
      },
      $dashboard: {
        rect: {
          width: 120,
          height: 40,
        },
      },
    },
  },
  {
    title: 'Heading',
    screenshot: 'https://img.alicdn.com/imgextra/i3/O1CN01n5wpxc1bi862KuXFz_!!6000000003498-55-tps-50-50.svg',
    schema: {
      componentName: 'Text',
      props: {
        text: 'Heading',
        fontSize: 24,
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      $dashboard: {
        rect: {
          width: 200,
          height: 50,
        },
      },
    },
  },
]

export default snippets
