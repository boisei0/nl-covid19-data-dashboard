import { useContext } from 'react';

import BarScale from 'components/barScale';
import Collapse from 'components/collapse';
import Metadata from 'components/metadata';
import GraphContainer from 'components/graphContainer';
import GraphContent from 'components/graphContent';
import GraphHeader from 'components/graphHeader';
import DateReported from 'components/dateReported';
import CoronaVirus from 'assets/coronavirus.svg';
import { LineChart } from './index';

import siteText from 'locale';
import { store } from 'store';

import { DeceasedPeopleNurseryCountDaily } from 'types/data';

export const NursingHomeInfectedDeaths: React.FC = () => {
  const globalState = useContext(store);
  const { state } = globalState;

  const text: typeof siteText.verpleeghuis_oversterfte =
    siteText.verpleeghuis_oversterfte;
  const data: DeceasedPeopleNurseryCountDaily | undefined =
    state?.NL?.deceased_people_nursery_count_daily;

  return (
    <GraphContainer>
      <GraphContent>
        <GraphHeader Icon={CoronaVirus} title={text.title.translation} />
        <p>{text.text.translation}</p>
        {data && (
          <BarScale
            min={0}
            max={50}
            screenReaderText={text.screen_reader_graph_content.translation}
            value={data.last_value.deceased_nursery_daily}
            id="over"
            gradient={[
              {
                color: '#3391CC',
                value: 0,
              },
            ]}
          />
        )}

        {data?.last_value?.deceased_nursery_daily !== null && (
          <DateReported
            datumsText={text.datums.translation}
            dateUnix={data?.last_value?.date_of_report_unix}
            dateInsertedUnix={data?.last_value?.date_of_insertion_unix}
          />
        )}
      </GraphContent>
      <Collapse
        openText={text.open.translation}
        sluitText={text.sluit.translation}
        piwikName="Sterfte"
        piwikAction="landelijk"
      >
        <h4>{text.fold_title.translation}</h4>
        <p>{text.fold.translation}</p>
        <h4>{text.graph_title.translation}</h4>

        {data && (
          <>
            <LineChart
              values={data.values.map((value) => ({
                value: value.deceased_nursery_daily,
                date: value.date_of_report_unix,
              }))}
            />
            <Metadata dataSource={text.bron} />
          </>
        )}
      </Collapse>
    </GraphContainer>
  );
};
