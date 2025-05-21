import {
  Button,
  Container,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import classes from "@/components/errors/AppError/AppError.module.css";

interface IProps {
  imageSrc: string;
  title: string;
  description: string;
  ctaButtonText: string;
  ctaClick: () => void;
}

export function AppError({
  title,
  description,
  ctaButtonText,
  ctaClick,
  imageSrc,
}: IProps) {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image alt="error" src={imageSrc} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>{title}</Title>
          <Text c="dimmed" size="lg">
            {description}
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            onClick={ctaClick}
            className={classes.control}
          >
            {ctaButtonText}
          </Button>
        </div>
        <Image alt="error" src={imageSrc} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
