import { GetStaticPaths, GetStaticProps } from "next"
import getHomePageData from "@/lib/getHomePageData"
import getSinglePageData from "@/lib/getSinglePageData"
import PageStructure from "@/components/page-structure"
import Products from "@/components/products"
import { log } from "console"
const PageData = ({ pageData, locale }: { pageData: any, locale: any }) => {
    return (
        <div className="max-w-[1450px] px-[10px] mx-auto">

            {pageData.map((data: any, ind: number) => (
                <PageStructure data={data} lang={locale} />
            ))}
        </div>
    )
}

export default PageData

export const getStaticPaths = async () => {
    const data_res = await getHomePageData("ae-en")

    const slugs = data_res.data.content.flatMap((section: any) => (
        section.type != "product_grid" && section.type != "gap" && (section.settings.hide_in_desktop_web === false || section.settings.hide_in_desktop_web === null || section.settings.hide_in_mobile_web === false || section.settings.hide_in_mobile_web === null) && section.section_data_array ?
            section.section_data_array.map((secDataArray: any) =>
                secDataArray.type_key === "page" ?
                    secDataArray.slug
                    : null
            )
            : null
    )).filter((slug: any) => (slug != null));

    const paths = [...new Set(slugs)].map((slug) => (
        {
            params: {
                pages: slug
            }
        }
    ))

    return {
        fallback: "blocking",
        paths,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const pagesParams = context.params?.pages;
    const pageData = await getSinglePageData(pagesParams)
    const locale = context.locale

    if (!pageData.success) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            pageData: pageData.data.content,
            locale
        },
    };
};