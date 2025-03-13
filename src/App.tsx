import "@mantine/core/styles.css";
import {MantineProvider} from "@mantine/core";
import {theme} from "./theme";
import {AppLayout} from "./hoc/AppLayout.tsx";
import './index.css';


export default function App() {
    // const [loading, setLoading] = useState(false);
    return (
        <MantineProvider theme={theme}>
            <div className="App">
                <AppLayout>
                </AppLayout>
            </div>
        </MantineProvider>
    );
}
