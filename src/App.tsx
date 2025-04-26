import "@mantine/core/styles.css";
import {AppLayout} from "./hoc/AppLayout.tsx";
import './index.css';
import '@mantine/dates/styles.css';

import {Notifications} from "@mantine/notifications";
import {MantineProvider} from "@mantine/core";
import {ModalsProvider} from "@mantine/modals";


export default function App() {
    // const [loading, setLoading] = useState(false);
    return (
        <>
            <MantineProvider>
                <Notifications/>
                <ModalsProvider>
                    <AppLayout/>
                </ModalsProvider>
            </MantineProvider>
        </>
    );
}
