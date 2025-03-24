import Wrapper from "../../components/layouts/wrapper";
import InputField from "../../components/input-fields/InputField";

export default function CompanySignup() {
    return (
        <Wrapper padding="2.4rem 2.4rem 4rem 2.4rem" gap="2.4rem">
            <InputField type="text" placeholder="Namn"></InputField>
            <InputField type="text" placeholder="Vilket företag..."></InputField>
            <InputField type="mail" placeholder="dittnamn@mail.com"></InputField>
        </Wrapper>
    )
}