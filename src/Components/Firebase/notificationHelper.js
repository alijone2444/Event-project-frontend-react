import { notification, Typography } from 'antd';
import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';

export const toastNotification = ({ title, body, date, location }) => {
    const { Paragraph } = Typography;

    notification.info({
        message: `${title}`,
        description: (
            <div>
                {date && <p><strong><CalendarOutlined /> Date:</strong> {date}</p>}
                {location && <p><strong><EnvironmentOutlined /> Location:</strong> {location}</p>}
                <div style={{ backgroundColor: "rgba(173, 216, 230, 0.5)", padding: '5%', borderRadius: '5%' }}>
                    <Paragraph ellipsis={{ rows: 2, expandable: true }}>{body}</Paragraph>
                </div>
            </div>
        ),
        duration: 0, // Set duration to 0 for indefinite display
    });
};

export const sendNativeNotification = ({ title, body }) => {
    // Implement your native notification logic
    console.log(`Native Notification: ${title} - ${body}`);
};



