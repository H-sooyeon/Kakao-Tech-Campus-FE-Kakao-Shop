import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../apis/product";
import ProductDetailInfo from "../components/molecules/ProductDetailInfo";
import Loader from '../components/atoms/Loader';
import ProductOption from "../components/molecules/ProductOption";
import * as Product from '../styles/pages/ProductDetailPage';
import ErrorPage from "./ErrorPage";

const ProductDetailPage = () => {
    const navigate = useNavigate();

    const { id } = useParams(); // string
    const parsedId = parseInt(id, 10);
    const {data: product, isLoading, isError, error} = useQuery(["product", id], () => getProductById(parsedId), {
        onError: (error) => {
            console.log(`something went wrong ${error.mssage}`);
            navigate('/error');
        },
    });

    return (
        <Product.Container>
            {isError ? <ErrorPage /> : null}
            {isLoading || !product?.data ? <Loader /> : (
                <>
                    <ProductDetailInfo product={product.data}/>
                    <ProductOption product={product.data} />
                </>
            )}
        </Product.Container>
    );
};

export default ProductDetailPage;