import React, { useEffect, useState } from "react";
import { Box, Image, Button, Textarea, CardBody, Card } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  TabList,
  TabIndicator,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  Text,
} from "@chakra-ui/react";
import Buttonn from "../components/Button/Button";
import { addToCart } from "../api/cart";
import { CloseIcon, StarIcon } from "@chakra-ui/icons";
import { addReview } from "../api/product";
const tg = window.Telegram.WebApp;

function numberWithSpaces(nr) {
  return nr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const ProductPage = () => {
  const [product, setProduct] = useState({ cost: 0, reviews: [] });
  const [showReviewCreator, setShowReviewCreator] = useState(false);
  const [stars, setStars] = useState(0);
  const [reviewBody, setReviewBody] = useState("");
  const { id } = useParams();
  const [currentSize, setCurrentSize] = useState("");
  console.log(currentSize);
  const sizes = ["XS", "S", "M", "L", "XL"];
  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:5000/api/item/one/${id}`)
      .then((data) => data.json())
      .then((data) => setProduct(data));
  }, []);

  return (
    <div>
      <Image
        src={`https://2a86-95-105-69-54.ngrok-free.app/${product.picture}`}
      />
      <Box p={3}>
        <Text fontSize="3xl">{product.name}</Text>
        <Box mb={3}>
          <Text as="b">{numberWithSpaces(product.cost)} ₽</Text>
        </Box>
        <Box display="flex" gap={2} mb={3}>
          {sizes.map((s) => (
            <Card
              onClick={() => setCurrentSize(s)}
              variant={currentSize == s ? "filled" : "elevated"}
              style={{
                cursor: "pointer",
                minWidth: "44px",
                minHeight: "44px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {s}
            </Card>
          ))}
        </Box>
        <div>
          {" "}
          <Buttonn
            style={{ width: "100%" }}
            onClick={() =>
              addToCart(tg.initDataUnsafe?.user?.first_name, product).then(
                (data) => console.log(data)
              )
            }
          >
            <Text>Добавить в корзину</Text>
          </Buttonn>
        </div>
        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Tab>О товаре</Tab>
            <Tab>Отзывы</Tab>
            <Tab>Вопросы</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              {!showReviewCreator && (
                <Button
                  onClick={() => setShowReviewCreator(true)}
                  colorScheme="purple"
                  variant="outline"
                >
                  Оставить отзыв
                </Button>
              )}
              {showReviewCreator && (
                <Card>
                  <CardBody>
                    <Box>
                      <Box mb={3}>
                        <Box>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <StarIcon
                              w={6}
                              h={6}
                              style={
                                stars >= n
                                  ? { cursor: "pointer", color: "orange" }
                                  : { cursor: "pointer" }
                              }
                              onClick={() => setStars(n)}
                            />
                          ))}
                        </Box>
                      </Box>
                      <Textarea
                        onChange={(e) => setReviewBody(e.target.value)}
                        placeholder="Ваши впечатление о товаре"
                      />
                      <Box display="flex" mt={2} gap={2}>
                        <Button
                          onClick={() => {
                            addReview(product._id, {
                              userName: tg.initDataUnsafe?.user?.first_name,
                              body: reviewBody,
                              stars,
                            }).then((data) => {
                              setProduct({
                                ...product,
                                reviews: [...product.reviews, data],
                              });
                              setShowReviewCreator(false);
                            });
                          }}
                          colorScheme="purple"
                          variant="outline"
                        >
                          Отправить
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => setShowReviewCreator(false)}
                          variant="outline"
                        >
                          Закрыть
                        </Button>
                      </Box>
                    </Box>
                  </CardBody>
                </Card>
              )}
              <Box>
                {product.reviews.map((r) => (
                  <Card mt={2} variant={"outline"}>
                    <CardBody>
                      <Box>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <StarIcon
                            style={
                              r.stars >= n
                                ? { cursor: "pointer", color: "orange" }
                                : { cursor: "pointer" }
                            }
                            onClick={() => setStars(n)}
                          />
                        ))}
                      </Box>
                      <Text as="b" fontSize={"14"}>
                        {r.userName}
                      </Text>
                      <Text fontWeight={"500"}>{r.body}</Text>
                    </CardBody>
                  </Card>
                ))}
              </Box>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default ProductPage;
