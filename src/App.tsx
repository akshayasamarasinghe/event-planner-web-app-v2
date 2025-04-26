import "@mantine/core/styles.css";
import {AppLayout} from "./hoc/AppLayout.tsx";
import './index.css';
import '@mantine/dates/styles.css';
import {MantineProvider} from "@mantine/core";
import {ModalsProvider} from "@mantine/modals";


export default function App() {
    // const [loading, setLoading] = useState(false);
    return (
        <>
            <MantineProvider>
                <ModalsProvider>
                    <AppLayout/>
                </ModalsProvider>
            </MantineProvider>
        </>
    );
}
