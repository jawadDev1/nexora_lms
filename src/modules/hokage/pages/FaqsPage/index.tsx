import Table from "@/components/ui/Table";
import FaqsActions from "@/components/ui/Table/elements/actions/FaqsActions";
import TableDate from "@/components/ui/Table/elements/TableDate";
import TableSr from "@/components/ui/Table/elements/TableSr";
import { GridColDef } from "@mui/x-data-grid";
import AddFaq from "../../components/faqs/AddFaq";
import { getHokageFaqs } from "../../services/faq.service";
import { notifyError } from "@/utils/toast";
import TableBoolean from "@/components/ui/Table/elements/TableBoolean";

const FaqsPage = async () => {
    const result = await getHokageFaqs("");

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
            field: "question",
            headerName: "Question",
            flex: 0.5,
        },
        {
            field: "answer",
            headerName: "Answer",
            flex: 0.5,
        },
        {
            field: "active",
            headerName: "Active",
            flex: 0.2,
            renderCell: TableBoolean,
        },
        {
            field: "id",
            headerName: "Actions",
            flex: 0.3,
            renderCell: FaqsActions,
        },
    ];

    return (
        <div className="bg-card rounded-xl py-6 px-5">
            <AddFaq />
            <Table rows={result?.data} cols={columns} />
        </div>
    );
};

export default FaqsPage;
