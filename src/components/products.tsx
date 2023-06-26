import getProductsData from "@/lib/getProductsData";
import ProductsSlider from "./products-slider";
import useSWR from 'swr';
import { fetcher } from "@/lib/getProductsDataSWR";
import { ProductsSkeleton } from "./productsSkeleton";
import { useRouter } from "next/router";

const productSk = Array(6).fill(<ProductsSkeleton />)

const Products = ({ lang, slug, type_key, proMetadata }: {
    lang: string;
    slug: string;
    type_key: string;
    proMetadata: any
}) => {

    switch (type_key) {
        case "collection":
            type_key = "collections"
            break

        case "category":
            type_key = "categories"
            break

        case "brand":
            type_key = "brands"
            break
    }

    const url = `https://prodapp.lifepharmacy.com/api/web/products?${type_key}=${slug}&order_by=popularity&type=cols&skip=0&take=7&new_method=true&lang=${lang}`
    const { data, error, isLoading } = useSWR(url, fetcher)

    const router = useRouter()

    return (
        <div className="sm:px-[10px] px-[5px] max-w-[1450px] mx-auto">
            <div style={{ background: proMetadata.settings.background_value }} className='  '>
                {proMetadata.settings.show_section_title ?
                    <div className="flex justify-between pt-3 mx-4 items-center ">
                        <h3 className="md:text-2xl sm:text-lg text-base font-bold flex-1">{proMetadata.section_title}</h3>
                        <button onClick={() => { router.push(`/products?collections=${proMetadata.section_data_object.slug}`) }} className="bg-[#39f] px-3 text-white text-xs flex items-center rounded py-2 leading-none"><span>View All</span> </button>
                    </div>
                    : null}
                {data ?
                    <ProductsSlider proData={data.data.products} /> :
                    <div className="flex overflow-x-auto no-scrollbar">
                        {productSk}
                    </div>}
            </div>
        </div>
    )
}

export default Products