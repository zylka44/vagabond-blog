import { TripType } from '../models/article.model';

export interface Section {
  tripKind: TripType;
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
}

export const SECTIONS: Section[] = [
  {
    tripKind: 'hiking',
    imageUrl: '',
    title: 'na piechotę',
    subtitle: 'Wędrówki piesze po górach i na nizinach',
    description:
      'Wędrówki piesze to idealny sposób by przyjrzeć się dokładnie otaczającej nas naturze. Krótkie wycieczki w okolicy, a także te dłuższe, zwłaszcza w górach, są idealnym sposobem na mentalny reset.',
  },
  {
    tripKind: 'bike',
    imageUrl: '',
    title: 'na rowerze',
    subtitle: 'Wyjazdy rowerowe z sakwami',
    description:
      'Wędrówka na rowerze to podróż w idealnym tempie. Wystarczajaco szybko by się nie nudzić i dostatecznie wolnno by podziwiać to, co się mija. Nie ma to jak przez jakiś czas ograniczyć swój dobytek do tego, co zmieści się w rowerowych sakwach.',
  },
  {
    tripKind: 'faraway',
    imageUrl: '',
    title: 'daleko',
    subtitle: 'Podróże do innych krajów',
    description:
      'Warto też zajrzeć gdzieś dalej, w zupełnie inny zakątek świata. Odległe krainy zachwycają różnorodnością krajobrazów i rozszerzają horyzonty.',
  },
];
