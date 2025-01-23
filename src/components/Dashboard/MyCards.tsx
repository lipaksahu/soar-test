import styled from 'styled-components';
import { useApp } from '../../context/AppContext';

const CardsContainer = styled.div`
  margin-bottom: 24px;
`;

const CardsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CardGrid = styled.div`
  display: flex;
  gap: 16px;
`;

const Card = styled.div<{ isDark?: boolean }>`
  background: ${props => props.isDark 
    ? 'linear-gradient(to bottom right, #5B5A6F 0%, #000000 100%)'
    : '#FFFFFF'};
  color: ${props => props.isDark ? '#FFFFFF' : '#2C2C54'};
  border-radius: 16px;
  width: 350px;
  height: 235px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .balance-label {
    font-size: 14px;
    opacity: 0.8;
  }

  .balance-amount {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    line-height: 1;
  }

  .card-details {
    display: flex;
    justify-content: space-between;
    margin: 24px 0;
    padding: 0 20px 0 20px;
  }

  .detail-label {
    font-size: 12px;
    opacity: 0.8;
    margin-bottom: 4px;
    letter-spacing: 0.5px;
  }

  .detail-value {
    font-size: 16px;
    font-weight: 500;
  }

  .card-number {
    font-size: 22px;
    letter-spacing: 2px;
  }

  .chip-icon {
    width: 40px;
    height: 40px;
  }

  .card-brand {
    width: 50px;
    height: 30px;
    opacity: 0.8;
  }

  .card-number-container {
    padding: 20px;
    background: ${props => props.isDark 
    ? 'linear-gradient(to bottom right, #5B5A6F 0%, #000000 100%)'
    : '#FFFFFF'};
    display: flex;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
    justify-content: space-between;
     border-top: ${props => props.isDark 
        ? 'none'
        : '1px solid #DFEAF2'};
  }

  .balance-details {
    padding: 20px 20px 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const MyCards: React.FC = () => {
  const { state, dispatch } = useApp();
  const { cards } = state;

  console.log({ cards })

  return (
    <CardsContainer>
      <CardsHeader>
        <h2 style={{ fontSize: 22, fontWeight: 600 }}>My Cards</h2>
        <button>See All</button>
      </CardsHeader>
      <CardGrid>
        {cards.map((card) => (
          <Card key={card.id} isDark={card.isDark}>
            <div className='balance-details'>
              <div>
                <div className="balance-label">Balance</div>
                <h3 className="balance-amount">${card.balance}</h3>
              </div>
              <div className="chip-icon">
                <img src={card.isDark ? '/Chip_Card_white.png' : '/Chip_Card_black.png'} width="36" height="36" alt="Chip Card" />
              </div>
            </div>
            <div className="card-details">
              <div>
                <div className="detail-label">CARD HOLDER</div>
                <div className="detail-value">{card.cardHolder}</div>
              </div>
              <div>
                <div className="detail-label">VALID THRU</div>
                <div className="detail-value">{card.validThru}</div>
              </div>
            </div>
            <div className="card-number-container">
                <div className="card-number">{card.cardNumber}</div>
                <div className="card-brand">
                    <img src={card.isDark ? '/mastercard.png' : '/mastercard_black.png'} alt="Card brandk" />
                </div>
            </div>
          </Card>
        ))}
      </CardGrid>
    </CardsContainer>
  );
};

export default MyCards; 