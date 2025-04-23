import {Badge} from "@mantine/core";
import {CategoryData} from "../constants/constants.ts";

const CategoryTags = ({categories}: any) => {
    return (
        <div>
            {categories?.map((cat: string) => (
                <Badge className="mr-2" variant="outline" color={CategoryData[cat]?.color}
                       radius="sm">{CategoryData[cat]?.label}</Badge>))
            }
        </div>
    )
}

export default CategoryTags;
