// ShareMenu.tsx
import {Button, Group, Menu, Tooltip} from '@mantine/core';
import {IconBrandFacebook, IconBrandTwitter, IconBrandWhatsapp} from '@tabler/icons-react';
import {FacebookShareButton, TwitterShareButton, WhatsappShareButton} from 'react-share';

const ShareMenu = ({url, title}: { url: string; title: string }) => {
    // const eventUrl = 'https://event-planner-qa.vercel.app/invitation/67dc385b3ec9270f303c8d60';
    // const eventTitle = 'Check out this awesome event! 🎉';

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    const message = `Check out this awesome event! 🎉\n${url}`;
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Tooltip label="Share this event">
                    {/*<ActionIcon size="lg" variant="outline" color="blue">*/}
                    {/*<IconShare size={20}/>*/}
                    <Button color="blue">
                        Share
                    </Button>
                    {/*</ActionIcon>*/}
                </Tooltip>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Share via</Menu.Label>

                <Menu.Item component="div">
                    <FacebookShareButton url={facebookShareUrl} title={title}>
                        <Group>
                            <IconBrandFacebook size={18}/>
                            Facebook
                        </Group>
                    </FacebookShareButton>
                </Menu.Item>

                <Menu.Item component="div">
                    <TwitterShareButton url={url} title={title}>
                        <Group>
                            <IconBrandTwitter size={18}/>
                            Twitter
                        </Group>
                    </TwitterShareButton>
                </Menu.Item>

                <Menu.Item component="div">
                    <WhatsappShareButton url={whatsappShareUrl} title={title}>
                        <Group>
                            <IconBrandWhatsapp size={18}/>
                            WhatsApp
                        </Group>
                    </WhatsappShareButton>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default ShareMenu;
