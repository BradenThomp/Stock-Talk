import StockPage from '../../app/components/templates/StockPage/StockPage'
import {useRouter} from'next/router'

export default function Stock() {
  const router = useRouter();
  const { ticker } = router.query;

  return (
    <StockPage ticker={ticker as string}/>
  );
}