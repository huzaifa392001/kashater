import React, { useEffect, useState } from "react";
import rewards_coin_ic from "../../website/assets/image/rewards-coin-ic.png";
import useApiHttp from "../../web/hooks/ues-http";

const RewardsPage = () => {
    const [data, setData] = useState([])
    //   console.log("data", data)

    const {
        isLoading: sendLoading,
        success: sendSuccess,
        error: sendError,
        sendRequest: sendRequest,
    } = useApiHttp()
    useEffect(() => {
        sendRequest(
            {
                url: `user/profile/reward-point`,
            },
            data => {
                setData(data?.data)
            }
        )
    }, [])

    return (<div className="rewards-info-cont mt-4">
        <h3>My Rewards</h3>
        <div className="reward-cont-card mt-4">
            <div className="df">
                <img className="" src={rewards_coin_ic} alt="" />
                <div className="reward-value">
                    <h1>{data?.points}</h1>
                    <p>
                        Your redeem points, you can use it in your next
                        order!
                    </p>
                </div>
            </div>
        </div>

        <div className="rec-transac mt-4">
            <h4>Recent Transactions</h4>
            <table>
                <tr className="rec-thead">
                    <th>Description</th>
                    <th>Type</th>
                    <th>Points</th>
                    <th>Date/Time</th>
                </tr>
                {data?.recent_transactions?.map((product, ind) => {
                    return (<tr className="request-tr" key={ind}>
                        <td>{product?.description}</td>
                        <td>{product?.type}</td>
                        <td>{product?.points}</td>
                        <td>{product?.date}</td>
                    </tr>)
                })}
            </table>
        </div>
    </div>)
}

export default RewardsPage