import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, ModalRoot, ModalCard, Spinner } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import bridge from "@vkontakte/vk-bridge";
import { useState, useEffect } from 'react';

export const Home = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const [animalModal, setAnimalModal] = useState(false);
  const [animalImageUrl, setAnimalImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRandomAnimal();
  }, []);

  async function fetchRandomAnimal() {
    try {
      setIsLoading(true);
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setAnimalImageUrl(data.message);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching random animal:', error);
      setIsLoading(false);
    }
  }

  function createAnimalStory() {
    bridge.send('VKWebAppShowStoryBox', {
      background_type: 'image',
      url: animalImageUrl,
    })
        .then((result) => {
          if (result.result) {
            console.log('Animal story editor opened successfully');
          }
        })
        .catch((error) => {
          console.error('Error opening animal story editor:', error);
        });
    setAnimalModal(false);
  }

  function generateNewAnimal() {
    setAnimalModal(true);
    fetchRandomAnimal();
  }

  return (
      <Panel id={id}>
        <PanelHeader>Главная</PanelHeader>
        {fetchedUser && (
            <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
              <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
                {`${first_name} ${last_name}`}
              </Cell>
            </Group>
        )}

        <Group header={<Header mode="secondary">Navigation Example</Header>}>
          <Div>
            <Button size="l" stretched onClick={generateNewAnimal}>
              Редактор историй с собачками
            </Button>
          </Div>
        </Group>

        {animalModal && (
            <ModalRoot activeModal="animal-story-editor">
              <ModalCard id="animal-story-editor">
                {isLoading ? (
                    <Div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <Spinner size="large" />
                    </Div>
                ) : (
                    <>
                      <img src={animalImageUrl} alt="Animal" />
                      <Div style={{ marginTop: '6px' }}>
                        <Button size="l" stretched onClick={createAnimalStory}>
                          Создать историю
                        </Button>
                      </Div>
                      <Div style={{ marginTop: '6px' }}>
                        <Button size="l" stretched onClick={generateNewAnimal}>
                          Сгенерировать другое фото
                        </Button>
                      </Div>
                    </>
                )}
              </ModalCard>
            </ModalRoot>
        )}
      </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};