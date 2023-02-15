import {
  List,
  Card,
  Image,
  Typography,
  Badge,
  Rate,
  Button,
  message,
  Spin,
  Select,
} from "antd";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart, getAllProducts, getProductsByCategory } from "../../API";

function Products() {
  const [loading, setLoasding] = useState(false);
  const param = useParams();
  const [items, setItems] = useState([]);
  useEffect(() => {
    setLoasding(true);
    (param?.categoryId
      ? getProductsByCategory(param.categoryId)
      : getAllProducts()
    ).then((res) => {
      setItems(res.products);
      setLoasding(false);
    });
  }, [param]);
  if (loading) {
    return <Spin spinning />;
  }
  return (
    <div className="productsContainer">
      <div>
        <Typography.Text>View Items Sorted By: </Typography.Text>
        <Select
        defaultValue={"az"}
        options={[
          {
            label:'Alphabetically a-z',
            value:'az'
          },
          {
            label:'Alphabetically z-a',
            value:'za'
          },
          {
            label:'Price Low to High',
            value:'lowHigh'
          },
          {
            label:'Price High to Low',
            value:'highLow'
          },
        ]}></Select>
      </div>
      <List
        grid={{ xxl: 6, xl: 5, lg: 4, md: 3, sm: 2, xs: 1 }}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon
              className="itemCardBadge"
              text={`${product.discountPercentage}% off`}
              color="red"
            >
              <Card
                className="itemCard"
                title={product.title}
                key={index}
                cover={
                  <Image className="itemCardImage" src={product.thumbnail} />
                }
                actions={[
                  <Rate allowHalf disabled value={product.rating} />,
                  <AddToCartButton item={product} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: ${product.price}{" "}
                      <Typography.Text delete type="danger">
                        $
                        {parseFloat(
                          product.price +
                            (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 1, expandable: true, symbol: "more" }}
                    >
                      {product.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
}
function AddToCartButton({ item }) {
  const [loading, setLoasding] = useState(false);
  const addProductToCart = () => {
    setLoasding(true);
    addToCart(item.id).then((res) => {
      message.success(`${item.title} has been added to cart`);
      setLoasding(false);
    });
  };
  return (
    <Button
      onClick={() => {
        addProductToCart();
      }}
      loading={loading}
      style={{ background: "teal", color: "white" }}
      type="link"
    >
      Add to Cart
    </Button>
  );
}
export default Products;
