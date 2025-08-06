import MainContainer from "@/components/_layout/MainContainer";
import InfoLabel from "@/components/InfoLabel";
import FormSkeleton from "@/components/skeletons/FormSkeleton";

export default function Loading() {
  return (
    <MainContainer>
      <FormSkeleton rows={3} className="w-full" />
      <InfoLabel>Obteniendo base de datos</InfoLabel>
    </MainContainer>
  );
}
