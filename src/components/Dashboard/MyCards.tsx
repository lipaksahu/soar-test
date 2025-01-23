import styled from 'styled-components';
import { useApp } from '../../context/AppContext';

const CardsContainer = styled.div`
  margin-bottom: 24px;
`;

const CardGrid = styled.div`
  display: flex;
  gap: 30px;
  
  @media (max-width: 1200px) {
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-wrap: nowrap;
    gap: 20px;
    overflow-x: auto;
    padding-bottom: 12px;
    justify-content: flex-start;
    
    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }
    
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
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
    gap: 23%;
    margin: 24px 0;
    padding: 0 20px 0 20px;

    @media (max-width: 480px) {
      gap: 15%;
      margin: 16px 0;
    }
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

    @media (max-width: 480px) {
      font-size: 18px;
      letter-spacing: 1px;
    }
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

   @media (max-width: 480px) {
    width: 100%;
    min-width: 280px;
    height: auto;
    min-height: 200px;
    display: block;
  }
`;

const MyCards: React.FC = () => {
  const { state } = useApp();
  const { cards } = state;

  return (
    <CardsContainer>
      <CardGrid aria-label="Credit cards grid">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            isDark={card.isDark}
            aria-label={`Credit card with balance $${card.balance}`}
          >
            <div className='balance-details'>
              <div>
                <div className="balance-label">Balance</div>
                <h3 className="balance-amount" aria-label={`Balance: $${card.balance}`}>${card.balance}</h3>
              </div>
              <div className="chip-icon">
                <img src={card.isDark ? '/Chip_Card_white.png' : '/Chip_Card_black.png'} width="36" height="36" alt="Credit card chip" />
              </div>
            </div>
            <div className="card-details">
              <div>
                <div className="detail-label">CARD HOLDER</div>
                <div className="detail-value" aria-label={`Card holder: ${card.cardHolder}`}>{card.cardHolder}</div>
              </div>
              <div>
                <div className="detail-label">VALID THRU</div>
                <div className="detail-value" aria-label={`Valid through: ${card.validThru}`}>{card.validThru}</div>
              </div>
            </div>
            <div className="card-number-container">
                <div className="card-number" aria-label={`Card number: ${card.cardNumber}`}>{card.cardNumber}</div>
                <div className="card-brand">
                    <img src={card.isDark ? '/mastercard.png' : '/mastercard_black.png'} alt="Mastercard logo" />
                </div>
            </div>
          </Card>
        ))}
      </CardGrid>
    </CardsContainer>
  );
};

export default MyCards; 