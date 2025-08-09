import Table from "@/components/ui/Table";
import TableDate from "@/components/ui/Table/elements/TableDate";
import TableSr from "@/components/ui/Table/elements/TableSr";
import { GridColDef } from "@mui/x-data-grid";
import { notifyError } from "@/utils/toast";
import { getHokageCategories } from "../../services/category.servic";
import CategoryActions from "@/components/ui/Table/elements/actions/CategoryActions";
import AddCategory from "../../components/category/AddCategory";

const HokageCategoryPage = async () => {
    const result = await getHokageCategories("");

    if (!result.success) {
        notifyError(result.message);
    }

    const columns: GridColDef[] = [
        {
            field: "",
            headerName: "Sr#",
            flex: 0.1,
            renderCell: TableSr,
        },
        {
            field: "title",
            headerName: "Title",
            flex: 0.7,
        },
        {
            field: "courses",
            headerName: "Courses",
            flex: 0.5,
        },
        {
            field: "created_at",
            headerName: "Created On",
            flex: 0.3,
            renderCell: TableDate,
        },
        {
            field: "id",
            headerName: "Actions",
            flex: 0.3,
            renderCell: CategoryActions,
        },
    ];

    return (
        <div className="bg-card rounded-xl py-6 px-5">
            <AddCategory />
            <Table rows={result?.data} cols={columns} />
        </div>
    );
};

export default HokageCategoryPage;
