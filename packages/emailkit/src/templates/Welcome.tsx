import { Body, Container, Heading, Html, Text } from "@react-email/components";

interface WelcomeEmailProps {
	name: string;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => (
	<Html>
		<Body className="bg-white font-sans">
			<Container className="p-8">
				<Heading className="text-2xl mb-4">Welcome, {name}!</Heading>
				<Text className="text-base">
					Thanks for signing up. We're excited to have you onboard.
				</Text>
			</Container>
		</Body>
	</Html>
);
