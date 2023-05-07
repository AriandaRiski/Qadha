import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const originalRenderPage = ctx.renderPage

        // Run the React rendering logic synchronously
        ctx.renderPage = () =>
            originalRenderPage({
                // Useful for wrapping the whole react tree
                enhanceApp: (App) => App,
                // Useful for wrapping in a per-page basis
                enhanceComponent: (Component) => Component,
            })

        // Run the parent `getInitialProps`, it now includes the custom `renderPage`
        const initialProps = await Document.getInitialProps(ctx)

        return initialProps
    }

    render() {
        return (
            <Html>
                <Head/>

                <Script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" />
                <Script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" />
                <Script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js" />

                {/* <Script>var Alert = ReactBootstrap.Alert;</Script> */}

                <Script src="https://code.jquery.com/jquery-3.5.1.min.js" />
                <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" />
                <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument