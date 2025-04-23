import "@mantine/core/styles.css";
import {AppLayout} from "./hoc/AppLayout.tsx";
import './index.css';
import '@mantine/dates/styles.css';

import {Notifications} from "@mantine/notifications";


export default function App() {
    // const [loading, setLoading] = useState(false);
    return (
        <>
            {/*<MantineProvider theme={theme}>*/}
            <Notifications/>
            <AppLayout/>
            {/*</MantineProvider>*/}
        </>
    );
}
